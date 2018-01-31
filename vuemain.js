const shell = require('node-powershell')

const vueapp = new Vue({
  el: '#vueapp',
  data: {
    gpulist: '',
    command: '',
    poolname: '',
    location: 'US',
    donate: '5',
    gainpct: '3',
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
      hashpool: ["xevan", "hsr", "phi", "tribus", "c11", "lbry", "skein", "sib", "bitcore", "x17", "Nist5", "myr-gro", "Lyra2RE2", "neoscrypt", "blake2s", "skunk"],
      hashrefinery: ["skunk", "phi", "xevan", "tribus", "skein", "bitcore", "x17", "Nist5", "Lyra2RE2", "neoscrypt"],
      miningpoolhub: ["cryp-night", "keccak", "lyra2z", "skein", "equihash", "groestl", "myr-gro", "Lyra2RE2", "neoscrypt"],
      zpool: ["poly", "hsr", "keccak", "xevan", "veltor", "skunk", "tribus", "c11", "x11evo", "lbry", "phi", "skein", "equihash", "groestl", "timetravel", "sib", "bitcore", "x17", "blakecoin", "Nist5", "myr-gro", "Lyra2RE2", "neoscrypt", "blake2s"],
      nicehash: ["cryp-night", "keccak", "skunk", "lbry", "equihash", "Nist5", "Lyra2RE2", "neoscrypt", "blake2s"]
    },
    inputs: {
      walletadress: {
        name: "Wallet Adress:",
        value: "3DYWArrdPYoEUzmfdxWGYh1cvdaozZm95q"
      },
      prefcurrency: {
        name: "Preferred Currency:",
        value: "BTC"
      },
        workerlogin: {
        name: "Worker Login:",
        value: "doctororbit"
      },
        workername: {
        name: "Worker Name:",
        value: "doctororbit"
      },
        password: {
        name: "Password:",
        value: "x"
      },
      gpunum: {
        name: "Number of GPU\'s:",
        value: "0"
      }
    }
  },
  methods: {
    startMining() {
      let ps = new shell({
        version: '5.0',
        windowStyle: 'maximized',
        executionPolicy: 'Bypass',
        noProfile: true
      })
      // console.log(this.Algos)
      ps.addCommand(this.Algos)
      ps.invoke()
        .then(output => {
          console.log("success")
          //console.log(output)
        })
        .catch(err => {
          console.log(err)
          ps.dispose()
        })
    },
    startblah() {
      let ps = new shell({
        version: '5.0',
        windowStyle: 'maximized',
        executionPolicy: 'Bypass',
        noProfile: true
      })
      // console.log(this.Algos)
      ps.addCommand("\"C:\\Users\\Tanis\\Desktop\\Projects\\masgui\\scripts\\NemosMiner-v2.4.1.ps1 -SelGPUDSTM '0' -SelGPUCC '0' -Currency USD -Passwordcurrency BTC -Interval 30 -Wallet 3DYWArrdPYoEUzmfdxWGYh1cvdaozZm95q -Location US -ActiveMinerGainPct 3 -PoolName hashrefinery -WorkerName doctororbit -Type nvidia -Algorithm Lyra2RE2 -Donate 5\"")
      ps.invoke()
        .then(output => {
          console.log("hello world")
          //console.log(output)
        })
        .catch(err => {
          console.log(err)
          ps.dispose()
        })
    },
    downloadBat(name, type, pool) {
      this.poolname = pool
      let a = document.getElementById("downloadClass")
      let file = new Blob([this.Algos], {
        type: type
      })
      a.href = URL.createObjectURL(file)
      a.download = name
    }
  },
  computed: {
    gpuNumbers() {
      let gpulist = {
        gpuc: '',
        gpus: ''
      }
      for (var i in this.inputs.gpunum.value) {
        gpulist.gpuc += i + ','
        gpulist.gpus += i + ' '
      }
      gpulist.gpuc = gpulist.gpuc.substring(0, gpulist.gpuc.length - 1)
      gpulist.gpus = gpulist.gpus.substring(0, gpulist.gpus.length - 1)
      return gpulist
    },

    Algos() {
      this.algolist = this.checkedAlgos.join()

      String.prototype.format = function() {
        var newStr = this
        i = 0
        while (/%s/.test(newStr)) {
          newStr = newStr.replace("%s", arguments[i++])
        }
        return newStr
      }

      this.command = [
        // "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command",
        // "\"" + __dirname + "\\scripts\\NemosMiner-v2.4.1.ps1",
        __dirname + "\\scripts\\NemosMiner-v2.4.1.ps1",
        "-SelGPUDSTM \'" + this.gpuNumbers.gpus + "'",
        "-SelGPUCC \'" + this.gpuNumbers.gpuc + "'",
        "-Currency USD",
        "-Passwordcurrency " + this.inputs.prefcurrency.value,
        "-Interval 30",
        "-Wallet " + this.inputs.walletadress.value,
        "-Location " + this.location,
        "-ActiveMinerGainPct " + this.gainpct,
        "-PoolName " + this.poolname.toLowerCase(),
        "-WorkerName " + this.inputs.workername.value,
        "-Type nvidia",
        "-Algorithm " + this.algolist,
        "-Donate " + this.donate
        //"-Donate " + this.donate + "\""
      ]

      this.command = this.command.join(' ')

      return this.command
    }
  }
})



//TODO: Execute command

/*
 */
