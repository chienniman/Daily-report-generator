function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`腳本加載失敗: ${src}`));
      document.body.appendChild(script);
    });
  }
  
  const scripts = [
    './dist/lib/bundle.js',
    './dist/components/app.js',
    './dist/components/fileReaders/fileInputs.js',
    './dist/components/fileReaders/xlsx2ppt.js',
    // './dist/components/actionButtons/dailySummary.js',
    './dist/components/actionButtons/exportToExcel.js',
    './dist/components/actionButtons/generateReport.js',
    './dist/components/actionButtons/reset.js',
    // './dist/components/actionButtons/toggleWidth.js',
    './dist/components/searchBox.js',
  ];
  
  async function loadAllScripts(scriptArray) {
    try {
      for (const script of scriptArray) {
        await loadScript(script);
        console.log(`加載: ${script}`);
      }
      console.log('全部加載完畢');
    } catch (error) {
      console.error(error);
    }
  }
  
  loadAllScripts(scripts);
  