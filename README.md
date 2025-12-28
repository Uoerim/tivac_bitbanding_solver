<p align="center">
  <img src="https://raw.githubusercontent.com/Uoerim/tivac_bitbanding_solver/main/icon.svg" alt="TivaC Bit-Banding Solver" width="80" height="80">
</p>

<h1 align="center">TivaC GPIO Bit-Banding Solver</h1>

<p align="center">
  <strong>ARM Cortex-M4 Masked Data & Bit-Band Calculator</strong>
</p>

<p align="center">
  <a href="https://uoerim.github.io/tivac_bitbanding_solver/">🌐 Live Demo</a> •
  <a href="https://github.com/Uoerim/tivac_bitbanding_solver/issues">🐛 Report Bug</a> •
  <a href="https://github.com/Uoerim/tivac_bitbanding_solver/issues">✨ Request Feature</a>
</p>

---

## ⚠️ Experimental Project

This project is currently in **experimental phase**. You may encounter bugs or unexpected behavior. If you find any issues, please [open an issue](https://github.com/Uoerim/tivac_bitbanding_solver/issues).

---

## 📖 About

A professional web-based calculator for solving TivaC TM4C123 GPIO bit-banding and masked data access problems. Perfect for students studying ARM Cortex-M4 microcontrollers and embedded systems.

### Key Features

- 🎯 **GPIO Data Masking Calculator** - Calculate masked values for GPIO Port F addresses
- 📊 **Interactive Memory Table** - Click any cell to edit and see all values update automatically
- ⚙️ **Register Configuration** - Set DIR, DEN, PUR values with hex input
- 🔧 **Configurable Table Size** - Adjust rows from 1 to 15
- 🎨 **Modern UI** - Professional dark theme with glassmorphism effects

---

## 🧮 How It Works

### GPIO Data Masking Formula

```
mask = (address - base_address) / 4
displayed_value = port_value & mask
```

### Write Operation

```
new_port = (old_port & ~mask) | (write_value & mask)
```

Only bits where the mask has 1s are affected by the write.

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Uoerim/tivac_bitbanding_solver.git
   ```

2. Open `index.html` in your browser

3. Configure GPIO Port F registers (DIR, DEN, PUR)

4. Adjust the table rows if needed (1-15)

5. Click any cell in the memory table to edit values

---

## 📋 GPIO Port F Base Address

| Port | Base Address |
|------|--------------|
| F    | 0x40025000   |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <strong>Yosif Ibrahim</strong>
</p>

<p align="center">
  Built for TivaC TM4C123 | ARM Cortex-M4 Architecture
</p>
