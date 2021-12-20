const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');
const shareLink = document.getElementById("short-url");
shareButton.addEventListener('click', event => {
  if (navigator.share) {
    console.log('Share API supported');
   navigator.share({
      title: 'Share the link',
      url: shareLink.getAttribute('href')
    }).then(() => {
      console.log('shared!');
    })
    .catch(console.error);
    } else {
    // alert('Share API not supported');
        shareDialog.classList.add('is-open');
    }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});