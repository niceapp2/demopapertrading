function downloadTrades() {
  const trades = tradeLogger.getTrades();
  const dataStr = JSON.stringify(trades, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trades-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
  if (typeof toast === 'function') toast('Trades downloaded', 'success');
}

function uploadTrades(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    if (tradeLogger.importTrades(e.target.result)) {
      if (typeof renderHist === 'function') renderHist();
      if (typeof renderPos === 'function') renderPos();
      if (typeof toast === 'function') toast('Trades restored from backup', 'success');
    } else {
      if (typeof toast === 'function') toast('Invalid backup file', 'error');
    }
  };
  reader.readAsText(file);
}