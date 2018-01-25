
const vueapp = new Vue({
  el: '#vueapp',
  data: {
    walletadress: '3DYWArrdPYoEUzmfdxWGYh1cvdaozZm95q',
    workerlogin: 'doctororbit',
    workername: 'doctororbit',
    prefcurrency: 'BTC',
    password: 'x',
    command: '',
    checkedAlgos: [],
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
      this.command = "cake";
      //return(oShell.ShellExecute(commandToRun, commandParams, "", "open", "1"));
    }
  }
});
/*
var oShell = new ActiveXObject("Shell.Application");

var commandToRun = "powershell -version 5.0 -noexit -executionpolicy bypass -windowstyle maximized -command "&.\NemosMiner-v2.4.1.ps1 -SelGPUDSTM '0 1' -SelGPUCC '0,1' -Currency USD -Passwordcurrency this.prefcurrency -interval 30 -Wallet this.walletadress -Location US -ActiveMinerGainPct 3 -PoolName hashrefinery -WorkerName this.workername -Type nvidia -Algorithm skunk,phi,xevan,tribus,skein,bitcore,x17,Nist5,Lyra2RE2,neoscrypt -Donate 0""
if (inputparams != ""){
  var commandParams = document.Form1.filename.value;
} */

//TODO: Execute command
//oShell.ShellExecute(commandToRun, commandParams, "", "open", "1");
