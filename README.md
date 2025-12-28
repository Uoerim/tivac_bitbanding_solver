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

- 🎯 **GPIO Data Masking Calculator** - Calculate masked values for GPIO port addresses
- 📊 **Interactive Memory Table** - Click any cell to edit and see all values update
- 📝 **Step-by-Step Explanations** - Detailed breakdown of each calculation
- ⚙️ **Register Configuration** - Set DIR, DEN, PUR values like exam questions
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

3. Select a GPIO port (A-F)

4. Click any cell in the memory table to edit

5. Watch all values update and read the step-by-step explanation!

---

## 📚 Theory Reference

| Register | Offset | Description |
|----------|--------|-------------|
| GPIODIR  | +0x400 | Direction (1=Output) |
| GPIODEN  | +0x51C | Digital Enable |
| GPIOPUR  | +0x510 | Pull-Up Resistor |
| GPIOPDR  | +0x514 | Pull-Down Resistor |

### GPIO Port Base Addresses

| Port | Base Address |
|------|--------------|
| A    | 0x40004000   |
| B    | 0x40005000   |
| C    | 0x40006000   |
| D    | 0x40007000   |
| E    | 0x40024000   |
| F    | 0x40025000   |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built for TivaC TM4C123 | ARM Cortex-M4 Architecture
</p>
