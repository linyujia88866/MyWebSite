import axios from "axios";
import Cookie from "quill-editor";
import {getUuid} from "@/utils/getUuid";

async function downloadPic(url) {
    try {
        await axios.get(url, {
            responseType: 'blob'
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("111111")
                    //浏览器下载
                    const myBlob = response.data
                    const qrUrl = window.URL.createObjectURL(myBlob);
                    let fileLink = document.createElement("a");
                    fileLink.href = qrUrl;
                    document.body.appendChild(fileLink);
                    fileLink.click();
                }
            });

    } catch (error) {

    }
}

function downFile(url, suffix) {
    console.log(url)
    fetch(url, {
        method: 'GET',
    })
        .then(res => res.blob())
        .then(data => {
            const blobUrl = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.download = getUuid() + suffix;
            a.href = blobUrl;
            a.click();
        });
}

export {
    downloadPic,
    downFile
}