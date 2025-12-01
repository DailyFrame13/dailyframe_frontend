import "../assets/scss/section/section2/_center.scss"
import { useRef, useState } from 'react'

const Center = () => {
  
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]); // 미리보기 이미지 상태

  const handleUplaodClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange =(e) => {
    const files = Array.from(e.target.files);

    if(files.length === 0) return;

    const selectedFiles = files.slice(0,3); //최대 3장만 사용

    if(files.length>3){
      alert("이미지는 3장만 업로드할 수 있어요!")
    }

    // 파일을 브라우저에서 볼 수 있도록 URL로 변환
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));

    // 상태에 저장 -> 화면에 자동으로 렌더링됨
    setPreviewImages(imageUrls);

  }

  return (
    <div className='center'>
      <div className="container1">
        <div className="title">DailyFrame</div>
        <div className="button_containter">
          {previewImages.length>0 && (
            <div className="preview_box">
              {previewImages.map((url, idx) => (
                <img key={idx} src={url} alt={`preview-${idx}`} className="preview_image" />
              ))}
            </div>
          )}
          <div className="image_button" onClick={handleUplaodClick}>이미지 업로드</div>
          {/* 숨겨진 파일 업로드 input */}
          <input 
            type="file"
            accept="image/*"
            multiple  
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="post_createbutton">포스터 생성하기</div>
        </div>
      </div>
      <div className="direction">
        →
      </div>
      <div className="container2">
        <div className="post_box">
          
        </div>
      </div>
    </div>
  )
}

export default Center
