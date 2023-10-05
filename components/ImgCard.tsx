import {useState, useEffect, FC, useRef, useMemo} from 'react';

const ImgCard: FC<any> = ({imgData, size, type, quality, handleDelete}) => {
  const canvasRef = useRef<any>(null);
  const imgOrgType = useMemo(() => {
    return imgData?.file?.type?.split('/')?.[1];
  }, [imgData]);
  const [imgSize, setImgSize] = useState<any>({});
  useEffect(() => {
    // 获取设备的像素比
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef?.current;
    const img = new Image()
    img.src = imgData?.base64;
    img.onload = function() {
      setImgSize({
        height: img.height,
        width: img.width,
      });
      const ctx = canvas.getContext('2d');

      // 计算出一个合适的缩放比例，以使图片的大小不超过200px
      const maxDimension = 200;
      const scale = Math.min(maxDimension / img.width, maxDimension / img.height);

      // 将canvas的大小设置为设备像素比与缩放后的图片大小的乘积
      canvas.width = maxDimension * dpr;
      canvas.height = maxDimension * dpr;

      // 使用CSS来将canvas的显示大小设置回200px
      canvas.style.width = `${maxDimension}px`;
      canvas.style.height = `${maxDimension}px`;

      // 计算图像的新宽度和高度
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      // 计算图像应该被绘制的位置，以使其在canvas中居中
      const x = (maxDimension - newWidth)/ 2;
      const y = (maxDimension - newHeight) / 2;
      // 确保所有的绘图操作都按照设备的像素比来进行
      ctx.scale(dpr, dpr);
      ctx.drawImage(img, x, y, newWidth, newHeight);
      //转格式
      // let base64_ok = _canvas.toDataURL(`image/${type}`, quality)
      canvasRef?.current?.toBlob(function(blob: any) {
          // ret(blob)
      }, `image/${type}`, quality)
    }
  }, []);


  return (<div className='w-[220px] h-[260px] bg-[rgba(51,51,72,0.1)] m-2 rounded-xl p-[10px]'>
    {/* <img className='w-[200px] h-[200px] border-0'></img> */}
    <canvas ref={canvasRef} />
    <div className='flex text-sm font-normal px-4 mt-2 justify-center'>
      <div className='truncate ...'>{imgData?.file?.name?.replace(imgOrgType, '')}</div>
      <div>{imgOrgType}</div>
    </div>
    <div className='text-xs font-normal text-[rgba(51,51,72,0.6)] flex px-5 justify-around'>
      <div>{Math.floor(imgData?.file?.size / 1024 / 1024 * 10) / 10}M</div>
      <div>{`${imgSize.width}x${imgSize.height}px`}</div>
    </div>
  </div>);
};

export default ImgCard;