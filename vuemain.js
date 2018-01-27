const shell = require('node-powershell');

const vueapp = new Vue({
  el: '#vueapp',
  data: {
    walletadress: '3DYWArrdPYoEUzmfdxWGYh1cvdaozZm95q',
    prefcurrency: 'BTC',
    workerlogin: 'doctororbit',
    workername: 'doctororbit',
    password: 'x',
    gpunum: '0',
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
      hashpool: [ "xevan", "hsr", "phi", "tribus", "c11", "lbry", "skein", "sib", "bitcore", "x17", "Nist5", "myr-gro", "Lyra2RE2", "neoscrypt", "blake2s", "skunk" ],
      hashrefinery: [ "skunk", "phi", "xevan", "tribus", "skein", "bitcore", "x17", "Nist5", "Lyra2RE2", "neoscrypt" ],
      miningpoolhub: [ "cryptonight", "keccak", "lyra2z", "skein", "equihash", "groestl", "myr-gro", "Lyra2RE2", "neoscrypt" ],
      zpool: [ "poly", "hsr", "keccak", "xevan", "veltor", "skunk", "tribus", "c11", "x11evo", "lbry", "phi", "skein", "equihash", "groestl", "timetravel", "sib", "bitcore", "x17", "blakecoin", "Nist5", "myr-gro", "Lyra2RE2", "neoscrypt", "blake2s" ],
      nicehash: [ "cryp-night", "keccak", "skunk", "lbry", "equihash", "Nist5", "Lyra2RE2", "neoscrypt", "blake2s" ]
    },
    inputs: [
      "walletadress",
      "prefcurrency",
      "workerlogin",
      "workername",
      "password",
      "gpunum"
    ],
    inputStrings: [
      "Wallet Adress:",
      "Preferred Currency:",
      "Worker Login:",
      "Worker Name:",
      "Password:",
      "Number of GPU's:"
    ]
  },
  methods: {
    startMining() {
      let ps = new shell({
        version: '5.0',
        windowStyle: 'maximized',
        executionPolicy: 'Bypass',
        noProfile: true,
        inputFormat: 'text'
      });
      // console.log(this.Algos)
      ps.addCommand(this.Algos) // -SelGPUDSTM '0' -SelGPUCC '0' -Currency USD -Passwordcurrency DGB -interval 30 -Wallet D5STb4D1RDa1qXv4x2DX9YgAfPub9rRVrQ -Location US -ActiveMinerGainPct 3 -PoolName hashrefinery -WorkerName ID=NemosMiner-v2.4.1 -Type nvidia -Algorithm skunk,phi,tribus,skein,bitcore,Nist5,Lyra2RE2,neoscrypt,yescrypt -Donate 0")
      ps.invoke()
        .then(output => {
          console.log(output);
        })
        .catch(err => {
          console.log(err);
          ps.dispose();
        });
    },
    downloadBat(name, type, pool) {
      this.poolname = pool;
      let a = document.getElementById("downloadClass");
      let file = new Blob([this.Algos], {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
    }
  },
  computed: {
    gpuNumbers() {
      let gpulist = {
        gpuc: '',
        gpus: ''
      }
      for (var i = 0; i < this.gpunum; i++) {
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
        "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command",
        "\"" + __dirname + "\\scripts\\NemosMiner-v2.4.1.ps1",
        "-SelGPUDSTM \'" + this.gpuNumbers.gpus + "'",
        "-SelGPUCC \'" + this.gpuNumbers.gpuc + "'",
        "-Currency USD",
        "-Passwordcurrency " + this.prefcurrency,
        "-Interval 30",
        "-Wallet " + this.walletadress,
        "-Location " + this.location,
        "-ActiveMinerGainPct " + this.gainpct,
        "-PoolName " + this.poolname.toLowerCase(),
        "-WorkerName " + this.workername,
        "-Type nvidia",
        "-Algorithm " + this.algolist,
        "-Donate " + this.donate + "\""
      ]

      this.command = this.command.join(' ')

      return this.command
    }
  }
});



//TODO: Execute command

/*
 */
