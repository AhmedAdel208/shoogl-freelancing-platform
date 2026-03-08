"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop"; 
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import getCroppedImg from "@/utils/cropImage";
import type { ImageCropModalProps } from "@/types/imageCropModal";

export default function ImageCropModal({
  imageUrl,
  isOpen,
  onClose,
  onConfirm,
  aspect = 1,
  cropShape = "round",
  title = "قص الصورة الشخصية",
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const onCropComplete = useCallback((_ : Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels || !imageUrl) return;
    
    try {
      setIsProcessing(true);
      const croppedBlob = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        rotation
      );
      if (croppedBlob) {
        onConfirm(croppedBlob);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="
        backdrop:bg-black/70 backdrop:backdrop-blur-sm
        bg-transparent p-0 m-auto
        open:animate-in open:fade-in open:zoom-in-95 duration-300
      "
    >
      <div className="bg-white rounded-[32px] w-[95vw] max-w-lg overflow-hidden shadow-2xl mx-auto flex flex-col font-cairo" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h3 className="text-xl font-black text-slate-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-slate-50 transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="relative w-full h-[400px] bg-slate-900 select-none">
          {imageUrl && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape={cropShape}
              showGrid={true}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              classes={{
                containerClassName: "h-full",
                mediaClassName: "max-w-none",
                cropAreaClassName: "border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]",
              }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="px-8 pt-6 pb-8 space-y-6 bg-white">
          {/* Zoom Slider */}
          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-400">التكبير</span>
                <span className="text-xs font-bold text-primary">{Math.round(zoom * 100)}%</span>
             </div>
             <div className="flex items-center gap-4">
               <button onClick={() => setZoom(z => Math.max(1, z - 0.1))} className="text-slate-400 hover:text-primary transition-colors">
                  <ZoomOut size={18} />
               </button>
               <input
                 type="range"
                 min={1}
                 max={3}
                 step={0.1}
                 value={zoom}
                 onChange={(e) => setZoom(parseFloat(e.target.value))}
                 className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary"
               />
               <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="text-slate-400 hover:text-primary transition-colors">
                  <ZoomIn size={18} />
               </button>
             </div>
          </div>

          {/* Rotate Button */}
          <button
            type="button"
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all border border-slate-100"
          >
            <RotateCw size={18} className="text-primary" />
            <span>تدوير 90 درجة</span>
          </button>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 px-6 border-2 border-primary/20 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all"
            >
              إلغاء
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleConfirm}
              className="flex-1 py-4 px-6 bg-primary text-white rounded-2xl font-black hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? "جاري المعالجة..." : "تأكيد"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
