import '../App.scss';
import WatermarkImage from '../assets/Watermark.svg'; // Import the SVG file

const Watermark = () => {
    return (
        <div className="watermark">
            <img src={WatermarkImage} alt="Watermark" />
        </div>
    );
};

export default Watermark;