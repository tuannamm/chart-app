const downloadSampleFile = () => {
  const ws = XLSX.utils.aoa_to_sheet([
    ["My Excel Title"],
    ["Month", "Nam", "Nam2"],
    ["Thang1", 12, 23],
    ["Thang2", 34, 34],
    ["Thang3", 20, 59],
  ]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

  // Create a URL for the blob
  const blobURL = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobURL;
  link.download = "sample.xlsx";
  link.click();
};
