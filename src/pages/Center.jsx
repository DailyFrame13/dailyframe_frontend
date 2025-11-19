import "../assets/scss/section/section2/_center.scss"
import { useRef } from 'react'

const Center = () => {
  
  const fileInputRef = useRef(null);

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

    console.log("선택된 파일:", selectedFiles);

    // 여기에서 파일 미리보기, 서버 업로드 등 처리 가능
  }

  return (
    <div className='center'>
      <div className="container1">
        <div className="title">DailyFrame</div>
        <div className="button_containter">
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
