# 🕵️ Node.js File Integrity & Signature Validator

A backend utility designed to verify the true identity of files by analyzing their binary "Magic Numbers." This project prevents file-extension spoofing by cross-referencing MIME types with internal buffer signatures.

## 🛠 Advanced Features
- **Binary Buffer Analysis**: Uses Node.js `Buffer` to read hex headers (Magic Bytes) directly from the file stream.
- **Multipart Data Handling**: Implements `Multer` for efficient memory-controlled file uploads.
- **Integrity Check Logic**: Compares the user-provided extension against the actual binary signature to detect spoofed files.
- **Automated Cleanup**: Includes a post-analysis `fs.unlink` routine to ensure temporary files are purged from the server immediately.

## 🚀 Setup
1. **Clone the repo**:
   ```bash
   git clone <your-repo-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install express multer
   ```
3. **Run**:
   ```bash
   node server.js
   ```

## 📑 How it works
Standard file uploads trust the file extension (e.g., `.jpg`). This tool reads the first 4 bytes of the file's hex code. For example, a PNG will always start with `89504E47`. If a user renames a `.exe` to `.png`, this tool will flag it as **Unsafe**.

## License
MIT
