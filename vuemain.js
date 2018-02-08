const vueapp = new Vue({
  el: '#vueapp',
  data: {
    startM: true,
    gpulist: '',
    command: '',
    poolname: '',
    checkedAlgos: [],
    alglolist: '',
    poolnames: [
      "HashPool",
      "HashRefinery",
      "MiningPoolHub",
      "Zpool",
      "NiceHash"
    ],
    pools: {
      hashpool: ["xevan", "hsr", "phi", "tribus", "c11", "lbry", "skein", "sib", "bitcore", "x17", "Nist5", "MyriadGroestl", "Lyra2RE2", "neoscrypt", "blake2s", "skunk"],
      hashrefinery: ["skunk", "phi", "xevan", "tribus", "skein", "bitcore", "x17", "Nist5", "Lyra2RE2", "neoscrypt"],
      miningpoolhub: ["CryptoNight", "keccak", "lyra2z", "skein", "equihash", "groestl", "MyriadGroestl", "Lyra2RE2", "neoscrypt"],
      zpool: ["poly", "hsr", "keccak", "xevan", "veltor", "skunk", "tribus", "c11", "x11evo", "lbry", "phi", "skein", "equihash", "groestl", "timetravel", "sib", "bitcore", "x17", "blakecoin", "Nist5", "MyriadGroestl", "Lyra2RE2", "neoscrypt", "blake2s"],
      nicehash: ["CryptoNight", "keccak", "skunk", "lbry", "equihash", "Nist5", "Lyra2RE2", "neoscrypt", "blake2s"]
    },
    inputs: {
      walletadress: {
        name: "Wallet Address:",
        value: "D6VmxuuEDDxY2uSkMLUVS4GGXTEP8Xwnxu",
        help: "Make sure that this is a valid address and use the proper coin symbol below!",
        message: ""
      },
      walletcoin: {
        name: "Wallet Coin:",
        value: "BTC",
        help: "BTC is recommended, check the MasGUI Website or Bitcointalk forum post to see which currencies are supported",
        message: ""
      },
      workerlogin: {
        name: "Worker Login:",
        value: "doctororbit",
        help: "Only required for MiningPoolHub.",
        message: ""
      },
      workername: {
        name: "Worker Name:",
        value: "doctororbit",
        help: "Can be whatever you like.",
        message: ""
      },
      password: {
        name: "Password:",
        value: "x",
        help: "'x' is fine, but you can change it if you prefer",
        message: ""
      },
      gpunum: {
        name: "GPU\'s:",
        value: "1",
        help: "Number of GPU's that should run on this Software (Nvidia only for now)",
        message: ""
      },
      gaimpact: {
        name: "Switch Algorithm on X% change:",
        value: "3",
        help: "Switches to a more profitable algorithm once the difference is >= X%",
        message: ""
      },
      donate: {
        name: "Donate X minutes per Day:",
        value: "5",
        help: "Number of minutes you want to donate per day (0 is not possible in Trial version)",
        message: ""
      },
      currency: {
        name: "Preferred Currency for displaying Profits/Day:",
        value: "USD",
        help: "(GBP, USD, AUD, EUR)",
        message: ""
      },
      location: {
        name: "Location:",
        value: "US",
        help: "Europe, Asia, US",
        message: ""
      }
    }
  },
  methods: {
    startMiner(data) {
      var spawn = require('child_process').spawn,
        ls = spawn('cmd.exe', ["/c", data], {
          env: process.env,
          detached: true
        })

      console.log(data)

      this.startM = !this.startM
      console.log("StartM: " + this.startM);

      ls.stdout.on('data', function(data) {
        console.log('stdout: ' + data)
      })

      ls.stderr.on('data', function(data) {
        console.log('stderr: ' + data)
      })

      ls.on('exit', function(code) {
        console.log('child process exited with code ' + code)
      })
    },
    downloadBat(name, type) {
      let a = document.getElementById("downloadClass")
      let file = new Blob([this.Algos], {
        type: type
      })
      a.href = URL.createObjectURL(file)
      a.download = name
    },
    missingName(inp) {
      if (inp.value === '') {
        inp.message = "Cannot be empty"
        return true
      } else if (inp.name == this.inputs.gpunum.name || inp.name == this.inputs.donate.name || inp.name == this.inputs.gaimpact.name) {
        //if (!inp.value.match(/\d+/g)) {
        if (isNaN(inp.value)) {
          inp.message = "Has to be a number!"
          return true
        }
      } else if (inp.name == this.inputs.currency.name || inp.name == this.inputs.location.name) {
        //if (inp.value.match(/\d+/g)) {
        if (!isNaN(inp.value)) {
          inp.message = "Has to be a text!"
          return true
        }
      }
    }
  },
  computed: {
    gpuNumbers() {
      let gpulist = {
        gpuc: '',
        gpus: ''
      }
      for (i = 0; i < this.inputs.gpunum.value.length; i++) {
        gpulist.gpuc += i + ','
        gpulist.gpus += i + ' '
      }
      gpulist.gpuc = gpulist.gpuc.substring(0, gpulist.gpuc.length - 1)
      gpulist.gpus = gpulist.gpus.substring(0, gpulist.gpus.length - 1)
      return gpulist
    },

    Algos() {
      this.algolist = this.checkedAlgos.join()

      if (this.poolname.toLowerCase() == 'zpool') {
        this.inputs.location.value = 'US'
      }

      if (this.inputs.donate.value <= 5) {
        this.inputs.donate.value = 5
        console.log(this.inputs.donate.value);
      }

      this.command = [
        "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command",
        __dirname + "\\scripts\\NemosMiner-v2.4.1.ps1",
        "-SelGPUDSTM \'" + this.gpuNumbers.gpus + "'",
        "-SelGPUCC \'" + this.gpuNumbers.gpuc + "'",
        "-Currency " + this.inputs.currency.value,
        "-Passwordcurrency " + this.inputs.walletcoin.value,
        "-Interval 30",
        "-Wallet " + this.inputs.walletadress.value,
        "-Location " + this.inputs.location.value,
        "-ActiveMinerGainPct " + this.inputs.gaimpact.value,
        "-PoolName " + this.poolname.toLowerCase(),
        "-WorkerName " + this.inputs.workername.value,
        "-Type nvidia",
        "-Algorithm " + this.algolist,
        "-Donate " + this.inputs.donate.value
      ]

      this.command = this.command.join(' ')

      return this.command
    },

    showButton() {
      if (this.inputs.gpunum.value > 0 && this.poolname != '' && this.checkedAlgos != '' && this.startM) {
        return true
      }
    }

  }
})
