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
      "hashpool",
      "hashrefinery",
      "miningpoolhub",
      "zpool",
      "nicehash"
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
        name: "Wallet Adress:",
        value: "D6VmxuuEDDxY2uSkMLUVS4GGXTEP8Xwnxu",
        help: "",
        message: "asd"
      },
      walletcoin: {
        name: "Wallet Coin:",
        value: "DGB",
        help: "",
        message: "das"
      },
      workerlogin: {
        name: "Worker Login:",
        value: "doctororbit",
        help: "",
        message: "3"
      },
      workername: {
        name: "Worker Name:",
        value: "doctororbit",
        help: "Hilfe Text4",
        message: "4"
      },
      password: {
        name: "Password:",
        value: "x",
        help: "Hilfe Text5",
        message: "5"
      },
      gpunum: {
        name: "Number of GPU\'s:",
        value: "1",
        help: "Hilfe Text6",
        message: "6"
      },
      gaimpact: {
        name: "Switch Algorithm on X% change:",
        value: "3",
        help: "Hilfe Text",
        message: "7"
      },
      donate: {
        name: "Donate X minutes per Day:",
        value: "5",
        help: "Hilfe Text",
        message: "8"
      },
      currency: {
        name: "Preferred Currency (i.e. USD/Day, EUR/Day etc.):",
        value: "US",
        help: "Hilfe Text",
        message: "9"
      },
      location: {
        name: "Location:",
        value: "US",
        help: "Hilfe Text",
        message: "10"
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
    filteredList(data, id) {
      /*
      */

      if (!data.match(/\d+/g)) {
        var elem = document.getElementById(id)
        elem.classList.toggle('is-invalid');
      }
      console.log(data)
      console.log(id)
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
      this.inputs.location.value[0] = 'US'
    }

    this.command = [
      "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command",
      __dirname + "\\scripts\\NemosMiner-v2.4.1.ps1",
      "-SelGPUDSTM \'" + this.gpuNumbers.gpus + "'",
      "-SelGPUCC \'" + this.gpuNumbers.gpuc + "'",
      "-Currency " + this.inputs.currency.value,
      "-Passwordcurrency " + this.inputs.walletcoin.value.toUpperCase(),
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
  }

}
})
