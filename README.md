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
- 📊 **Interactive Memory Table** - Click any cell to edit and see all values update automatically
- 📝 **Step-by-Step Explanations** - Detailed breakdown of each calculation
- 🔧 **Configurable Table Size** - Adjust rows from 1 to 15
- 🔘 **Port Selection** - Switch between GPIO Ports A-F
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

4. Adjust the table rows if needed (1-15)

5. Click any cell in the memory table to edit

6. Watch all values update and read the step-by-step explanation!

---

## 📚 Important Notes

### For Exam Questions (Memory Table)
The memory table values depend **ONLY** on:
- The data latch value (what you last wrote)
- The mask calculated from the address

**DIR, DEN, PUR do NOT affect the memory table values.**

### For Hardware (LEDs, Buttons)
To make writes work electrically on real hardware:
- **DIR** - Direction (1=Output, 0=Input)
- **DEN** - Digital Enable
- **PUR** - Pull-Up Resistor
- **PDR** - Pull-Down Resistor

---

## 📋 GPIO Port Base Addresses

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
  Made with ❤️ by <strong>Yosif Ibrahim</strong>
</p>

<p align="center">
  Built for TivaC TM4C123 | ARM Cortex-M4 Architecture
</p>
