import base64
import json
import os
import glob
from datetime import datetime, timedelta
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization

# ===================== 全局配置 =====================
KEY_ID = "AFAN"
FORMAT_TAG = "flutter_app_updater.ed25519.v1"
VALID_DAYS = 7  # 签名有效期7天
# ====================================================

def load_private_key() -> str:
    """加载私钥：本地文件优先，CI环境读取环境变量"""
    local_key_path = "./private.key"
    if os.path.exists(local_key_path):
        with open(local_key_path, "r", encoding="utf-8") as f:
            return f.read()
    # GitHub Actions 环境变量
    env_key = os.getenv("ED25519_PRIVATE_KEY", "")
    if not env_key:
        raise RuntimeError("未找到私钥：本地无 local_private.key，环境变量 ED25519_PRIVATE_KEY 为空")
    return env_key

def build_sign_message(manifest_raw_bytes: bytes, issued_at: str, expires_at: str) -> bytes:
    """严格对齐Dart signatureInput 拼接规则"""
    part_format = FORMAT_TAG.encode("utf-8") + b"\0"
    part_meta = f"{KEY_ID}\0{issued_at}\0{expires_at}\0".encode("utf-8")
    return part_format + part_meta + manifest_raw_bytes

def generate_envelope(manifest_file_path: str, priv_key: ed25519.Ed25519PrivateKey):
    """
    根据单个清单生成签名信封
    :param manifest_file_path: 原始 app-updates-xxx.json 路径
    :param priv_key: Ed25519私钥实例
    """
    # 1. 读取原始清单二进制（不格式化）
    with open(manifest_file_path, "rb") as f:
        manifest_raw_bytes = f.read()

    # 2. 生成UTC时间
    now_utc = datetime.utcnow()
    issued_dt = now_utc
    expires_dt = now_utc + timedelta(days=VALID_DAYS)
    ISSUED_AT = issued_dt.isoformat(timespec="seconds") + "Z"
    EXPIRES_AT = expires_dt.isoformat(timespec="seconds") + "Z"

    # 3. 生成外层payload base64
    payload_b64 = base64.b64encode(manifest_raw_bytes).decode("utf-8")

    # 4. 构造签名消息并签名
    sign_msg = build_sign_message(manifest_raw_bytes, ISSUED_AT, EXPIRES_AT)
    raw_sig = priv_key.sign(sign_msg)
    sig_b64 = base64.b64encode(raw_sig).decode("utf-8")

    # 5. 组装信封结构
    envelope = {
        "format": FORMAT_TAG,
        "keyId": KEY_ID,
        "issuedAt": ISSUED_AT,
        "expiresAt": EXPIRES_AT,
        "payload": payload_b64,
        "signature": sig_b64
    }

    # 6. 生成输出文件名：app-updates-xxx.json → update-envelope-xxx.json
    dir_name = os.path.dirname(manifest_file_path)
    file_name = os.path.basename(manifest_file_path)
    out_file_name = file_name.replace("app-updates-", "update-envelope-")
    out_path = os.path.join(dir_name, out_file_name)

    # 写入文件
    envelope_json = json.dumps(envelope, indent=2, ensure_ascii=False)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(envelope_json)

    print(f"✅ 已生成: {out_path}")

def find_all_manifest_files() -> list[str]:
    """全局搜索所有 app-updates-*.json 文件"""
    match_pattern = "**/app-updates-*.json"
    file_list = glob.glob(match_pattern, recursive=True)
    if not file_list:
        print("⚠️ 未找到任何 app-updates-*.json 文件")
    return file_list

if __name__ == "__main__":
    # 加载私钥并实例化
    pem_text = load_private_key()
    private_key = serialization.load_pem_private_key(
        pem_text.encode("utf-8"),
        password=None
    )

    # 查找全部清单文件并批量生成
    manifest_paths = find_all_manifest_files()
    for path in manifest_paths:
        generate_envelope(path, private_key)

    print("\n🎉 全部签名信封生成完成")
