import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import { PlusIcon } from '@heroicons/react/20/solid';
import ImgCard from '../components/ImgCard';

export default function Home() {
  const [fileList, setFileList] = useState<any[]>([]);


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
    console.log('res', res);
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
      const blob = await base642file(item.base64);
      const type = item?.file?.type?.split('/')?.[1];
      handleDownload(blob, item.file.name.replace(type, 'png'));
    }
  }
  return (
    <>
      <Head>
        <title>Aviftopng - Convert Avif to Png</title>
        <meta
          name="description"
          content="You can convert avif images to png and many other formats for free using online conversion tools!"
        />
        <meta
          name="keywords"
          content="avif to png, how to change avif to png
          "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://aviftopng.top" />
      </Head>
      <div className='flex flex-col min-h-screen'>
        <a href='https://www.douban.com/link2/?url=https%3A%2F%2Faviftopng.top'></a>
        <a href='https://link.csdn.net/?target=https%3A%2F%2Faviftopng.top'></a>
        <a href='https://www.coolapk.com/link?url=https%3A%2F%2Faviftopng.top'></a>
        <Header />
        <div className='bg-[rgba(51,51,72,0.1)] grow flex flex-col items-center px-5'>
          {/* <h2 className='text-4xl font-bold mt-10'>Convert images</h2> */}
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
            <div className='p-10'>
              <h2 className='text-2xl font-semibold'>AVIF to PNG</h2>
              <p className='font-normal text-lg'>
                You can convert avif images to png and many other formats for free using online conversion tools!
              </p>
              <p className='font-normal text-lg'>
                Convert image files with our easy to use and free tool. Our tool lets you upload a AVIF (AV1 Image File Format) file and from this, create a new image saved in the PNG (Portable Network Graphics). Our conversion tool can also batch convert multiple AVIF image files.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>Advantages of our tools</h2>
              <p className='font-normal text-lg'>
                Process images online without uploading files.
                No need to upload files, more privacy.
                aviftopng.com all tools are implemented using browser technology.
                Faster and safer, 100% free.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>AVIF</h2>
              <p className='font-normal text-lg'>
                The AVIF format is an image based container format designed to store image or image sequences which are compressed with the AV1 compression algorithm. The format has been around since 2019 and is based on the HEIF container format and as such it competes with the HEIC image format.
              </p>
              <p className='font-normal text-lg'>
                During tests the format has shown to perform better than JPG files not just in the reduced file size but in overall image quality. Support for the format is growing and is already supported in the Chrome and Firefox web browsers. AVIF files can also be opened in many 2D image editing applications.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>PNG</h2>
              <p className='font-normal text-lg'>
                Portable Network Graphics (PNG) is a raster graphics file format that supports lossless data compression. PNG was created as an improved, non-patented replacement for Graphics Interchange Format (GIF), and is the most used lossless image compression format on the Internet. PNG itself does not support animation at all. MNG is an extension to PNG that does; it was designed by members of the PNG Group.
              </p>
            </div>
          </div>}
          {fileList?.length !== 0 && <div className='flex w-full'>
            <div className='grow basis-[300px] pl-9'>
              <div className='flex justify-end items-center mt-5'>
                <button className="btn btn-accent btn-sm mr-3" onClick={() => {
                  setFileList([]);
                }}>Clear All</button>
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
                <select className="select select-bordered">
                  <option selected>PNG</option>
                  {/* <option>JPG</option>
                  <option>WEBP</option>
                  <option>JPG</option>
                  <option>AVIF</option> */}
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Image Quality</span>
                </label>
                <select className="select select-bordered">
                  <option selected>Original image</option>
                  {/* <option>JPG</option>
                  <option>WEBP</option>
                  <option>JPG</option>
                  <option>AVIF</option> */}
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
