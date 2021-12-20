function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function copyToClipboard(element) {
    navigator.clipboard.writeText(element.id);
    temp  = element.innerHTML;
    element.innerHTML = "Copied!";
    await sleep(2000);
    element.innerHTML = temp;
}