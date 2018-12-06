const SECCore = require('../src/main').secCore

module.exports = function (socket) {
  const ClientIP = socket.request.connection.remoteAddress
  console.log('Client: ' + ClientIP + ' Connected to Token Pool')

  pushInfos(socket)

  const pushInfoLoop = setInterval(() => {
    pushInfos(socket)
  }, 5000)

  socket.on('disconnect', function () {
    console.log('Client: ' + ClientIP + ' Disconnected to Token Pool')
    clearInterval(pushInfoLoop)
  })
}

function pushInfos (socket) {
  socket.emit('TokenPool', {
    Transactions: SECCore.CenterController.BlockChain.TokenPool.getAllTxFromPool().reverse(),
    HashArray: SECCore.CenterController.BlockChain.TokenPool.getTxHashArrayFromPool().reverse()
  })
}
