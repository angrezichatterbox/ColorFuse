function handleSave() {
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
      setImageViewer([...imageViewer, editedImageDataURL]);
      const link = document.createElement("a");
      link.href = editedImageDataURL;
      link.download = "edited_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }
