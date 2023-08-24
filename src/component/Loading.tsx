import React from 'react'

interface LoadingProps {
  isShow : boolean
}

function Loading({isShow}:LoadingProps) {
  return (
    <div className={`modal fade ${isShow ? "show" : ""}`} style={{display: isShow ? "block" : "none", backgroundColor:"rgba(0,0,0,0.5)"}} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className='mt-3 fs-5 fw-bolder '>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="modal show fade" style={{display:"block"}} tabIndex={-1}>
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">Modal title</h5>
    //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div className="modal-body">
    //         <p>Modal body text goes here.</p>
    //       </div>
    //       <div className="modal-footer">
    //         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         <button type="button" className="btn btn-primary">Save changes</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Loading