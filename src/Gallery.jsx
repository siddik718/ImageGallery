import { useState } from 'react';
import { imageArray } from './images';
const Gallery = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState(imageArray);
    const toggleImageSelection = (index) => {
        const isSelected = selectedImages.includes(index);
        if (isSelected) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    }
    const handleDelete = () => {
        const updatedImage = images.filter((image, index) => !selectedImages.includes(index))
        setImages(updatedImage);
        setSelectedImages([]);
    }
    const [dragStartImage, setDragStartImage] = useState(0);
    const [dragEndImage, setDragEndImage] = useState(0);
    const handleSort = () => {
        const imageClone = [...images];
        const temp = imageClone[dragStartImage];
        imageClone[dragStartImage] = imageClone[dragEndImage];
        imageClone[dragEndImage] = temp;
        setImages(imageClone);
    }
    return (
        <div>
            <div className="center">
                <p>Gallery</p>
                <button className='delete' onClick={handleDelete}>Delete</button>
            </div>
            <div className="parent">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`div${index + 1}`}
                        draggable
                        onDragStart={() => { setDragStartImage(index) }}
                        onDragEnter={() => { setDragEndImage(index) }}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input
                            type="checkbox"
                            name='selectedImage'
                            style={{ display: selectedImages.includes(index) && 'block' }}
                            className='select-btn'
                            checked={selectedImages.includes(index)}
                            onChange={() => toggleImageSelection(index)}
                        />
                        <img src={image} alt="headphones" />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Gallery