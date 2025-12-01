import "../assets/scss/section/section2/_center.scss"
import { useRef, useState } from 'react'

const Center = () => {
  
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]); // 미리보기용 URL
  const [selectedFiles, setSelectedFiles] = useState([]); // ⭐️ [추가] 서버 전송용 진짜 파일
  const [resultImage, setResultImage] = useState(null);   // ⭐️ [추가] 결과 이미지 URL
  const [isLoading, setIsLoading] = useState(false);      // ⭐️ [추가] 로딩 상태

  const handleUplaodClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if(files.length === 0) return;

    const targetFiles = files.slice(0,3); // 최대 3장

    if(files.length > 3){
      alert("이미지는 3장만 업로드할 수 있어요!")
    }

    // 1. 미리보기용 URL 저장
    const imageUrls = targetFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(imageUrls);

    // 2. ⭐️ [추가] 진짜 파일 객체 저장 (API 전송용)
    setSelectedFiles(targetFiles);
  }

  // ⭐️ [핵심] 포스터 생성 버튼 클릭 시 실행
  const handleGeneratePoster = async () => {
    // 파일이 없으면 경고
    if (selectedFiles.length === 0) {
      alert("이미지를 먼저 업로드해주세요!");
      return;
    }

    setIsLoading(true); // 로딩 시작

    try {
      const formData = new FormData();
      // ⚠️ 주의: 백엔드 API가 현재 '단일 파일(upload.single)'만 받도록 되어 있어서
      // 일단 첫 번째 사진(selectedFiles[0])만 보냅니다.
      formData.append("file", selectedFiles[0]);

      // 백엔드로 요청 (API 호출)
      const response = await fetch("http://localhost:3000/api/v1/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("서버 에러가 발생했습니다.");
      }

      // ✅ Blob(이미지 덩어리)으로 받아서 URL로 변환
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      setResultImage(imageUrl); // 결과 이미지 저장
      console.log("변환 성공!", imageUrl);

    } catch (error) {
      console.error("에러 발생:", error);
      alert("생성에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    <div className='center'>
      <div className="container1">
        <div className="title">DailyFrame</div>
        <div className="button_containter">
          {previewImages.length > 0 && (
            <div className="preview_box">
              {previewImages.map((url, idx) => (
                <img key={idx} src={url} alt={`preview-${idx}`} className="preview_image" />
              ))}
            </div>
          )}
          <div className="image_button" onClick={handleUplaodClick}>이미지 업로드</div>
          
          <input 
            type="file"
            accept="image/*"
            multiple  
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* ⭐️ 클릭 이벤트 연결 */}
          <div className="post_createbutton" onClick={handleGeneratePoster}>
            {isLoading ? "생성 중..." : "포스터 생성하기"}
          </div>
        </div>
      </div>

      <div className="direction">
        →
      </div>

      <div className="container2">
        <div className="post_box">
          {/* ⭐️ 결과 화면 렌더링 로직 */}
          {isLoading ? (
            <div style={{ color: 'white', fontSize: '1.2rem' }}>
              🤖 AI가 열심히 그리는 중...
            </div>
          ) : resultImage ? (
            <img 
              src={resultImage} 
              alt="Generated Poster" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ color: '#ccc' }}>결과물이 여기에 표시됩니다</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Center