
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
    poolname: '',
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
      console.log(this.Algos)
    }
  },
  computed: {
    gpuNumbers() {
      let gpulist = {
        gpucommas: '',
        gpuspaces: ''
      }
      for (var i = 0; i < this.gpunum; i++) {
        gpulist.gpucommas += i + ','
        gpulist.gpuspaces += i + ' '
      }
      gpulist.gpucommas = gpulist.gpucommas.substring(0, gpulist.gpucommas.length - 1)
      gpulist.gpuspaces = gpulist.gpuspaces.substring(0, gpulist.gpuspaces.length - 1)
      return gpulist
    },

    Algos() {
      this.algolist = this.checkedAlgos.join()

      this.command = [
        "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command \"&.\\NemosMiner-v2.4.1.ps1",
        "-SelGPUDSTM " + this.gpuNumbers.gpuspaces,
        "-SelGPUCC " + this.gpuNumbers.gpucommas,
        "-Currency USD",
        "-Passwordcurrency " + this.prefcurrency,
        "-interval 30",
        "-Wallet " + this.walletadress,
        "-Location " + this.location,
        "-ActiveMinerGainPct 3 -PoolName " + this.poolname,
        "-WorkerName " + this.workername,
        "-Type nvidia",
        "-Algorithm " + this.algolist,
        "-Donate 5\""
      ]

      this.command = this.command.join(' ')

      return this.command
    }
  }
});
/*
*/
var oShell = new ActiveXObject("Shell.Application");

var commandToRun = this.command
if (inputparams != ""){
  var commandParams = document.Form1.filename.value;
}
oShell.ShellExecute(commandToRun, commandParams, "", "open", "1");

//TODO: Execute command
