const shell = require('node-powershell');


const vueapp = new Vue({
  el: '#vueapp',
  data: {
    walletadress: '3DYWArrdPYoEUzmfdxWGYh1cvdaozZm95q',
    workerlogin: 'doctororbit',
    workername: 'doctororbit',
    prefcurrency: 'BTC',
    password: 'x',
    command: '',
    gpunum: '0',
    gpulist: '',
    poolname: 'hashrefinery',
    location: 'US',
    checkedAlgos: [],
    alglolist: '',
    totalAlgos: [
      "skunk",
      "phi",
      "xevan",
      "tribus",
      "skein",
      "bitcore",
      "x17",
      "Nist5",
      "Lyra2RE2",
      "neoscrypt"
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
      ps.addCommand("&.\\scripts\\NemosMiner-v2.4.1.ps1 -SelGPUDSTM '0' -SelGPUCC '0' -Currency USD -Passwordcurrency DGB -interval 30 -Wallet D5STb4D1RDa1qXv4x2DX9YgAfPub9rRVrQ -Location US -ActiveMinerGainPct 3 -PoolName hashrefinery -WorkerName ID=NemosMiner-v2.4.1 -Type nvidia -Algorithm skunk,phi,tribus,skein,bitcore,Nist5,Lyra2RE2,neoscrypt,yescrypt -Donate 0")
      // ps.addCommand("&.\\NemosMiner-v2.4.1.ps1 -SelGPUDSTM '0' -SelGPUCC '0' -Currency USD -Passwordcurrency DGB -interval 30 -Wallet D5STb4D1RDa1qXv4x2DX9YgAfPub9rRVrQ -Location US -ActiveMinerGainPct 3 -PoolName hashrefinery -WorkerName ID=NemosMiner-v2.4.1 -Type nvidia -Algorithm skunk,phi,tribus,skein,bitcore,Nist5,Lyra2RE2,neoscrypt,yescrypt -Donate 0")
      // ps.addCommand(this.Algos)
      ps.invoke()
      .then(output => {
        console.log(output);
      })
      .catch(err => {
        console.log(err);
        ps.dispose();
      });
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

      this.command = [
        // "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command \"&.\\NemosMiner-v2.4.1.ps1",
        "&.\\scripts\\NemosMiner-v2.4.1.ps1",
        "-SelGPUDSTM '" + this.gpuNumbers.gpus + "'",
        "-SelGPUCC '" + this.gpuNumbers.gpuc + "'",
        "-Currency \'USD\'",
        "-Passwordcurrency " + this.prefcurrency,
        "-interval 30",
        "-Wallet " + this.walletadress,
        "-Location " + this.location,
        "-ActiveMinerGainPct 3",
        "-PoolName " + this.poolname,
        "-WorkerName " + this.workername,
        "-Type nvidia",
        "-Algorithm " + this.algolist,
        "-Donate 5"
      ]

      this.command = this.command.join(' ')

      return this.command
    }
  }
});



//TODO: Execute command
