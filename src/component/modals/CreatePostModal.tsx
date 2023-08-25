import React, { useState } from 'react'
import FileDropzone from '../DropZone';

function CreatePostModal() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileAdded = (files: File[]) => {
    // Update the uploadedFiles state with the dropped files
    setUploadedFile(files[0]);
  };

  const handlePost = async (file: File, textData: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('textData', textData);
  
      const response = await fetch('/upload-endpoint', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Handle successful upload
        console.log('Image and text data uploaded successfully');
      } else {
        console.error('Error create post');
      }
    } catch (error) {
      console.error('Error create post', error);
    }
  };
  
  return (
    <div>
      <div className="modal fade" id="createPostModal" tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createPostModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center gap-2 my-2">
                <div className="create-hover-color rounded-circle p-2" >pic</div>
                <div className="" >
                  <div className="">name</div>
                  <div className="comment-bg px-1 rounded" style={{marginTop:"-5px"}}><i className="bi bi-people-fill"></i> Friends</div>
                </div>
              </div>
              <textarea className='w-100 mt-2' placeholder={`What's on your mind`} style={{border:"none", outline:"none"}} />
              <div className='upload'>
                <FileDropzone onFileAdded={handleFileAdded} />
              </div>
            </div>
            <div className="modal-footer justify-content-center " style={{borderTop:"unset"}}>
              <button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal