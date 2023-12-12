import React, { useState } from "react";
import "./App.css";
import ImgsViewer from "react-images-viewer";

export default function App() {
  const [width, setWidth] = useState(100);
  const [borderRadius, setBorderRadius] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [opacity, setOpacity] = useState(100);
  const [file, setFile] = useState();
  const [showWidthSlider, setShowWidthSlider] = useState(false);
  const [showBorderRadiusSlider, setShowBorderRadiusSlider] = useState(false);
  const [showGrayscaleSlider, setShowGrayscaleSlider] = useState(false);
  const [showRotateSlider, setShowRotateSlider] = useState(false);
  const [showInvertSlider, setShowInvertSlider] = useState(false);
  const [showSepiaSlider, setShowSepiaSlider] = useState(false);
  const [showSaturateSlider, setShowSaturateSlider] = useState(false);
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);
  const [showContrastSlider, setShowContrastSlider] = useState(false);
  const [showOpacitySlider, setShowOpacitySlider] = useState(false);
  const [imageViewer, setImageViewer] = useState([]);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = file;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.filter = `grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) saturate(${saturate}%) hue-rotate(${rotate}deg) brightness(${brightness}%) contrast(${contrast}%) opacity(${opacity}%)`;
      context.drawImage(img, 0, 0, img.width, img.height);
      const editedImageDataURL = canvas.toDataURL("image/png");
      setImageViewer([...imageViewer, { src: editedImageDataURL, caption: "Edited Image" }]);
      const link = document.createElement("a");
      link.href = editedImageDataURL;
      link.download = "edited_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const handleAddToImageViewer = () => {
    if (file) {
      setImageViewer([...imageViewer, { src: file, caption: "Original Image" }]);
      setFile(null);
    }
  };

  const Slider = React.memo(({ label, state, setState, min, max, id }) => (
    <div className="slider">
      <label htmlFor={id}>{label}:</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={state}
        onChange={({ target: { value } }) => setState(value)}
      />
    </div>
  ));

  const createSlider = (label, state, setState, min, max, id) => (
    <Slider key={id} label={label} state={state} setState={setState} min={min} max={max} id={id} />
  );

  const widthSlider = createSlider("Width", width, setWidth, 1, 100, "slider1");
  const borderRadiusSlider = createSlider("Border Radius", borderRadius, setBorderRadius, 0, 50, "slider2");
  const grayscaleSlider = createSlider("GreyScale", grayscale, setGrayscale, 0, 100, "slider3");
  const rotateSlider = createSlider("Rotate", rotate, setRotate, 0, 360, "slider4");
  const invertSlider = createSlider("Invert", invert, setInvert, 0, 100, "slider5");
  const sepiaSlider = createSlider("Sepia", sepia, setSepia, 0, 100, "slider6");
  const saturateSlider = createSlider("Saturate", saturate, setSaturate, 0, 200, "slider7");
  const brightnessSlider = createSlider("Brightness", brightness, setBrightness, 0, 200, "slider8");
  const contrastSlider = createSlider("Contrast", contrast, setContrast, 0, 200, "slider9");
  const opacitySlider = createSlider("Opacity", opacity, setOpacity, 0, 100, "slider10");

  return (
    <div className="app-container">
      <div className="file-input-container">
        <label htmlFor="fileInput">Choose an Image:</label>
        <input type="file" id="fileInput" onChange={handleChange} />
      </div>

      <div className="button-container">
        <button onClick={() => setShowWidthSlider(!showWidthSlider)}>Width</button>
        <button onClick={() => setShowBorderRadiusSlider(!showBorderRadiusSlider)}>Border Radius</button>
        <button onClick={() => setShowGrayscaleSlider(!showGrayscaleSlider)}>Grayscale</button>
        <button onClick={() => setShowRotateSlider(!showRotateSlider)}>Rotate</button>
        <button onClick={() => setShowInvertSlider(!showInvertSlider)}>Invert </button>
        <button onClick={() => setShowSepiaSlider(!showSepiaSlider)}>Sepia </button>
        <button onClick={() => setShowSaturateSlider(!showSaturateSlider)}>Saturate</button>
        <button onClick={() => setShowBrightnessSlider(!showBrightnessSlider)}>Brightness</button>
        <button onClick={() => setShowContrastSlider(!showContrastSlider)}>Contrast</button>
        <button onClick={() => setShowOpacitySlider(!showOpacitySlider)}>Opacity</button>
      </div>

      {showWidthSlider && widthSlider}
      {showBorderRadiusSlider && borderRadiusSlider}
      {showGrayscaleSlider && grayscaleSlider}
      {showRotateSlider && rotateSlider}
      {showInvertSlider && invertSlider}
      {showSepiaSlider && sepiaSlider}
      {showSaturateSlider && saturateSlider}
      {showBrightnessSlider && brightnessSlider}
      {showContrastSlider && contrastSlider}
      {showOpacitySlider && opacitySlider}

      <div className="image-container">
        <img
          src={file}
          alt="Selected"
          style={{
            borderRadius: `${borderRadius}px`,
            filter: `grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) saturate(${saturate}%) hue-rotate(${rotate}deg) brightness(${brightness}%) contrast(${contrast}%) opacity(${opacity}%)`,
            width: `${width}%`,
          }}
        />
        <button className="save-button" onClick={handleSave}>
          Save Image
        </button>
        <button className="view-button" onClick={() => setIsImageViewerOpen(true)}>
          View Images
        </button>
      </div>

      <div className="image-viewer">
        {imageViewer.map((image, index) => (
          <img key={index} src={image.src} alt={image.caption} />
        ))}
      </div>

      <ImgsViewer
        imgs={imageViewer}
        isOpen={isImageViewerOpen}
        onClickPrev={() => {}}
        onClickNext={() => {}}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}
