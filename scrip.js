// async function uploadreceipt(){
//     const receiptFile=document.getElementById('receiptFile');
//     const file=receiptFile.files[0];

//     if(!file || file.type !='application/pdf'){
//         alert('Please select a valid PDF file');
//         return;
//     }
//     const Filename=file.name;
//     const url=`https://projcect-receipt-bucket.s3.us-east-1.amazonaws.com/receipts/${Filename}`;
//     try{
//     const res=await fetch(url,{
//         method:'PUT',
//         headers: {
//             'Content-Type': 'application/pdf',
//         },
//         body: file,
//     });

//     if(res.ok){
//         alert("File Uploaded succesfully");
//         console.log("File url:",url);
//     }else{
//         alert("Error uploading file");
//     }
//     }catch(error){
//         console.error("Error:",error);
//     }
// }

async function uploadreceipt(){
    const receiptFile=document.getElementById('receiptFile');
    const file=receiptFile.files[0];

    if(!file || file.type!='application/pdf'){
        alert('Please select a valid PDF file');
        return;
    }

    const res=await fetch('https://duqt95s9ec.execute-api.us-east-1.amazonaws.com/prob/upload-url',{
        method : 'POST',
        headers:{
            'Content-Type': 'application/pdf',
        },
        body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
        }),
    });

    if(!res.ok){
        alert("Error fetching signed URL");
        return;
    }
    const { signedUrl }=await res.json();
    console.log("Upload:",signedUrl);

    const upload=await fetch(signedUrl,{
        method : 'PUT',
        headers:{
            'Content-Type': file.type,
        },
        body: file,
    });

    if(upload.ok){
        alert('File Uploaded succesfully');
        console.log('File url:',signedUrl);
    }else{
        alert("Upload failed");
    }
}