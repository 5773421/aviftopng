import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import { PlusIcon } from '@heroicons/react/20/solid';
import ImgCard from '../components/ImgCard';
import Feature from '../components/Feature';
import HowToUse from '../components/HowToUse';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

export default function Home() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>('PNG');
  const [selectedQua, setSelectedQua] = useState<any>(1);


  // 生成base64
  const file2Base64 = (file: File) => {
    return new Promise((ret, res) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
            ret(this.result)
        }
    })
  }

  // base64还原成图片  type = 'jpeg/png/webp'  size 尺寸   quality 压缩质量
  function base642file(base64: any, type = 'png', size = 1, quality = 1) {
    console.log('type', type);
    return new Promise((ret, res) => {
        let img = new Image()
        img.src = base64
        let canvasEle: any = document.createElement('canvas');
        img.onload = function() {
            //处理缩放
            let w = img.width * size
            let h = img.height * size
            canvasEle.setAttribute("width", w)
            canvasEle.setAttribute("height", h)
            canvasEle.getContext("2d").drawImage(this, 0, 0, w, h)
            //转格式
            // let base64_ok = _canvas.toDataURL(`image/${type}`, quality)
            canvasEle.toBlob(function(blob: any) {
                ret(blob)
            }, `image/${type}`, quality)
        }
    })
  }

  // 处理上传的文件
  const handleFilesChange = async (e: any) => {
    const files = Array.from(e?.target?.files);
    const formatFiles = files?.map(async (item: any) => {
      const base64 = await file2Base64(item);
      return ({
        file: item,
        idx: Math.floor(Math.random() * 10000000000),
        base64,
      });
    });
    const res = await Promise.all(formatFiles);
    setFileList([...fileList, ...res]);
  }

  const handleDelete = (idx: number) => {
    const newList = fileList?.filter((item: any) => item.idx !== idx);
    setFileList(newList);
  };

  //下载文件
  const handleDownload = (content: any, filename = '未命名') => {
    let eleLink = document.createElement('a')
    eleLink.download = filename
    eleLink.style.display = 'none'
    // 字符内容转变成blob地址
    let blob = new Blob([content])
    eleLink.href = URL.createObjectURL(content)
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
    // location.reload()
  }

  // 转换格式
  const handleConvert = async (e: any) => {
    for (const item of fileList) {
      const blob = await base642file(item.base64, selectedType?.toLowerCase?.(), 1, selectedQua);
      const type = item?.file?.type?.split('/')?.[1];
      handleDownload(blob, item.file.name.replace(type, selectedType?.toLowerCase?.()));
    }
  }
  return (
    <>
      <Head>
        <title>AVIF to PNG Conversion - High-Quality, Easy, and Fast</title>
        <meta
          name="description"
          content="Transform your AVIF images to PNG effortlessly with our state-of-the-art conversion tools. Ensure high-quality and compatibility across various platforms."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://aviftopng.top" />
      </Head>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='grow flex flex-col items-center pb-5 lg:pb-0'>
          <h1 className='text-4xl font-bold mt-10'>Avif to Png Tool (Free & Online)</h1>
          <input type="file" name="files" id="files"
            accept=".jpeg,.jpg,.png,.gif,.webp,.svg,.ico,.bmp,.avif"
            multiple className='hidden'
            onChange={handleFilesChange}
          />
          {fileList?.length === 0 && <div className='w-full mt-20'>
            <label htmlFor='files' className='w-full flex justify-center'>
              <div className='w-full max-w-3xl h-[225px] border-[6px] border-dashed border-[rgba(51,51,72,0.2)] rounded-xl flex flex-col justify-center items-center'>
                <div className='mb-4 font-bold'>You can select one or more files.</div>
                <div className="btn btn-primary">Select the file</div>
              </div>
            </label>
          </div>}
          {fileList?.length === 0 && <Feature />}
          {fileList?.length === 0 && <HowToUse />}
          {fileList?.length === 0 && <Faq />}
          {fileList?.length === 0 && <Footer />}
          {fileList?.length !== 0 && <div className='lg:flex w-full px-20'>
            <div className='grow basis-[300px] pl-9'>
              <div className='flex justify-end items-center mt-5'>
                <button className="btn btn-accent btn-sm mr-3" onClick={() => {
                  setFileList([]);
                }}>GO BACK</button>
                <label htmlFor="files">
                  <div
                    className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </label>
              </div>
              <div className='flex flex-wrap'>
                {
                  fileList?.map((item: any, index: number) => {
                    return (<ImgCard handleDelete={handleDelete} key={index} imgData={item} size={1} type='png' quality={1}/>);
                  })
                }
              </div>
            </div>
            <div className='w-[300px] h-fit bg-white py-2.5 px-5 mt-4 ml-3 rounded-[10px]'>
              <div className='text-lg font-medium'>Convert format</div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Format</span>
                </label>
                <select className="select select-bordered" value={selectedType} onChange={(e: any) => {
                  setSelectedType(e?.target?.value || 'png');
                }}>
                  <option>PNG</option>
                  <option>JPEG</option>
                  <option>WEBP</option>
                  {/* <option>AVIF</option> */}
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Image Quality</span>
                </label>
                <select className="select select-bordered" value={selectedQua} onChange={(e: any) => {
                  setSelectedQua(e?.target?.value);
                }}>
                  <option value={1}>Original image</option>
                  {/* <option value={0.9}>High</option>
                  <option value={0.7}>Middle</option>
                  <option value={0.5}>Low</option> */}
                </select>
              </div>

              <button
                className="btn btn-primary w-full mt-10"
                onClick={handleConvert}
              >
                START AND DOWNLOAD
              </button>
            </div>
          </div>}
        </div>
        <div>
        </div>
      </div>
    </>
  );
}
