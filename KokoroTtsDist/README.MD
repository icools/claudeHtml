# HOW-TO

去kokoro官方github下載repo 

`https://github.com/hexgrad/kokoro`

內有一個`kokoro-js`版本，透過修改加上`chrome extension`的`sidepanel`接收`message`能力

增加將要播放的tts文字傳送到kokoro react中，然後修改他自動播放

# 主要修改 App.jsx檔案

加上這段 effect 

```js
  useEffect(() => {
    const handleMessage = (event) => {
      // 可以選擇驗證 event.origin
      if (event.data && event.data.type === "TTS_TEXT" && event.data.text) {
        const newText = event.data.text;
        setInputText(newText);
        setStatus("running");
        worker.current.postMessage({
          type: "generate",
          text: newText.trim(),
          voice: selectedSpeaker,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [selectedSpeaker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("running");

    worker.current.postMessage({
      type: "generate",
      text: inputText.trim(),
      voice: selectedSpeaker,
    });
  };
```

就可以讓kokoro react接收到`message`後自動播放tts

透過 `npm run build` 產生`dist`後，將`dist`發佈到任何一個http host的靜態空間即可(因為chrome extension不支援`file://`)

當然你可以透過local server來測試，這樣就不用每次都build，但如果你在別的地方也要使用，就可以選擇用host static site的方式

# Sidebar Panel extension

這段程式碼放在 目前這邊的`../KokoroTtsDist/`下，直接參考即可。