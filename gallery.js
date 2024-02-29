console.log("Gallery JS", db);

setTimeout(() => {
    console.log("Gallery JS --", db);
    if (db) {
        let videoDBTransaction = db.transaction('video', 'readonly');
        let videoStore = videoDBTransaction.objectStore('video');
        let videoRequest = videoStore.getAll();
        console.log("Gallery JS ---", videoRequest);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            console.log("Gallery JS ----", videoResult);
            let galleryCont = document.querySelector('.gallery-cont');
            videoResult.forEach((obj) => {
                let mediaElem = document.createElement('div');
                mediaElem.setAttribute('class', 'media-cont');
                mediaElem.setAttribute('id', obj.id)

                let url = URL.createObjectURL(obj.blobData)
                mediaElem.innerHTML = `
                    <div class="media">
                        <video autoplay muted loop src="${url}"></video>
                    </div>
                    <div class="download action-btn">
                        Download
                    </div>
                    <div class="delete action-btn">
                        Delete
                    </div>
                `
                galleryCont.append(mediaElem);

                let downloadBtn = mediaElem.querySelector('.download');
                downloadBtn.addEventListener('click', downloadListener);
                let deleteBtn = mediaElem.querySelector('.delete');
                deleteBtn.addEventListener('click', deleteListener);
            })

        }

        let imageDBTransaction = db.transaction('image', 'readonly');
        let imageStore = imageDBTransaction.objectStore('image');
        let imageRequest = imageStore.getAll();
        console.log("Gallery JS ---", imageRequest);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            console.log("Gallery JS ----", imageResult);
            let galleryCont = document.querySelector('.gallery-cont');
            imageResult.forEach((obj) => {
                let mediaElem = document.createElement('div');
                mediaElem.setAttribute('class', 'media-cont');
                mediaElem.setAttribute('id', obj.id)


                mediaElem.innerHTML = `
                    <div class="media">
                        <img src="${obj.url}"/>
                    </div>
                    <div class="download action-btn">
                        Download
                    </div>
                    <div class="delete action-btn">
                        Delete
                    </div>
                `
                galleryCont.append(mediaElem);

                let downloadBtn = mediaElem.querySelector('.download');
                downloadBtn.addEventListener('click', downloadListener);
                let deleteBtn = mediaElem.querySelector('.delete');
                deleteBtn.addEventListener('click', deleteListener);
            }
            )

        }
    }
}, 100);

function deleteListener(e) {
    let id = e.target.parentElement.getAttribute('id');
    if (id.slice(0, 3) === 'vid') {
        let videoDBTransaction = db.transaction('video', 'readwrite');
        let videoStore = videoDBTransaction.objectStore('video');
        videoStore.delete(id);
    }

    if (id.slice(0, 3) === 'img') {
        let imageDBTransaction = db.transaction('image', 'readwrite');
        let imageStore = imageDBTransaction.objectStore('image');
        imageStore.delete(id);
    }

    e.target.parentElement.remove();
}

function downloadListener(e) {
    let id = e.target.parentElement.getAttribute('id');
    if (id.slice(0, 3) === 'vid') {
        let videoDBTransaction = db.transaction('video', 'readwrite');
        let videoStore = videoDBTransaction.objectStore('video');
        let videoResult = videoStore.get(id);
        videoResult.onsuccess = (event) => {
            let videoURL = URL.createObjectURL(videoResult.result.blobData);

            let a = document.createElement('a');
            a.href = videoURL;
            a.download = `${id}.mp4`
            a.click();
        }
    }

    if (id.slice(0, 3) === 'img') {
        let imageDBTransaction = db.transaction('image', 'readwrite');
        let imageStore = imageDBTransaction.objectStore('image');
        let imageResult = imageStore.get(id);

        imageResult.onsuccess = (event) => {
            let a = document.createElement('a');
            a.href = imageResult.result.url;
            a.download = `${id}.jpg`
            a.click();
        }

    }
}

