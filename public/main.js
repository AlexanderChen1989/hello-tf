const { WebRequest, WebResponse, Image } = require("./infer_pb.js");
const { WebClient } = require("./infer_grpc_web_pb.js");

const client = new WebClient("http://localhost:3000");

const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener(
    "click",
    function(e) {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    },
    false
);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
    if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        const list = document.createElement("ul");
        fileList.appendChild(list);
        for (let i = 0; i < this.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = URL.createObjectURL(this.files[i]);
            img.height = 200;
            img.onload = function() {
                URL.revokeObjectURL(this.src);
            };
            li.appendChild(img);
            const info = document.createElement("span");

            upload(this.files[i], li, info);
        }
    }
}

function upload(file, li, info) {
    const req = new WebRequest();



    let formData = new FormData();

    formData.append("photo", file);
    fetch("/", { method: "POST", body: formData }).then((res) => {
        res.json().then((data) => {
            let { image, preds } = data[0];
            info.innerHTML = `
	  <p>
	  ${preds[0].name} - ${preds[0].probability} <br />
	  ${preds[1].name} - ${preds[1].probability} <br />
	  ${preds[2].name} - ${preds[2].probability} <br />
	  </p>
	  <hr />
	`;
            li.appendChild(info);
        });
    });
}