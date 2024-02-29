import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import { PlusIcon } from '@heroicons/react/20/solid';
import ImgCard from '../components/ImgCard';

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
        <title>AVIF to PNG - Convert Avif images to Png (Free & Easy & Fast)</title>
        <meta
          name="description"
          content="You can convert avif to png and many other formats for free using online conversion tools!"
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
        <Header />
        <div className='bg-[rgba(51,51,72,0.1)] grow flex flex-col items-center px-5 pb-5 lg:pb-0'>
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
                aviftopng.top all tools are implemented using browser technology.
                Faster and safer, 100% free.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>AVIF IMAGE</h2>
              <p className='font-normal text-lg'>
                The AVIF format is an image based container format designed to store image or image sequences which are compressed with the AV1 compression algorithm. The format has been around since 2019 and is based on the HEIF container format and as such it competes with the HEIC image format.
              </p>
              <p className='font-normal text-lg'>
                During tests the format has shown to perform better than JPG files not just in the reduced file size but in overall image quality. Support for the format is growing and is already supported in the Chrome and Firefox web browsers. AVIF files can also be opened in many 2D image editing applications.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>PNG IMAGE</h2>
              <p className='font-normal text-lg'>
                Portable Network Graphics (PNG) is a raster graphics file format that supports lossless data compression. PNG was created as an improved, non-patented replacement for Graphics Interchange Format (GIF), and is the most used lossless image compression format on the Internet. PNG itself does not support animation at all. MNG is an extension to PNG that does; it was designed by members of the PNG Group.
              </p>
              <p className='font-normal text-lg'>
                PNGs use lossless compression, which offers high-quality images with more colours. However, this often means PNG files are bigger than some other formats like JPG. The PNG format is open source, and you can open these files using almost all devices, image editors and viewers. Many smartphones now allow you to easily remove backgrounds and create PNGs of individual parts of photos.
              </p>

              <h2 className='text-2xl font-semibold mt-5'>How can I convert my AVIF file to PNG?</h2>
              <p className='font-normal text-lg'>First click the `Select the file` button, select your AVIF file to upload. Select any configuration options. When the AVIF to PNG conversion has completed, you can download your PNG file straight away.</p>

              <h2 className='text-2xl font-semibold mt-5'>How long does it take to convert my AVIF to PNG?</h2>
              <p className='font-normal text-lg'>We aim to process all AVIF to PNG conversions as quickly as possible, this usually takes around 5 seconds but can be more for larger more complex files so please be patient.</p>

              <h2 className='text-2xl font-semibold mt-5'>How accurate is the AVIF to PNG conversion?</h2>
              <p className='font-normal text-lg'>We aim to create the most accurate conversions with our tools. Our tools are under constant development with new features and improvements being added every week.</p>

              <h2 className='text-2xl font-semibold mt-5'>Can I convert AVIF to PNG on Windows, Linux, Android, iOS or Mac OS?</h2>
              <p className='font-normal text-lg'>Our AVIF to PNG tool will run on any system with a modern web browser. No specialist software is needed to run any of our conversion tools.</p>

              <h2 className='text-2xl font-semibold mt-5'>I have several AVIF files, can I batch convert my AVIF to PNG?</h2>
              <p className='font-normal text-lg'>Yes! Our AVIF tool supports full batch conversions. Our tool will convert them all as quickly as possible. Once completed.</p>

      
              <h2 className='text-2xl font-semibold mt-5'>Difference Between AVIF and PNG</h2>
              <p className='font-normal text-lg'>Yes! Our AVIF tool supports full batch conversions. Our tool will convert them all as quickly as possible. Once completed.</p>
              <h2 className='text-2xl font-semibold mt-5'>Difference Between AVIF and PNG</h2>

              <p>AVIF (AV1 Image File Format) and PNG (Portable Network Graphics) are two image formats with distinct characteristics. Here are some key differences between AVIF and PNG based on the search results:</p>

              <ul><li><strong>Compression</strong>: AVIF offers much better compression than PNG or JPEG, with images up to ten times smaller than JPEGs of similar visual quality[1].</li><li><strong>Features</strong>: AVIF supports lossy and lossless compression, high dynamic range (HDR), wide color gamut, and transparency, making it a versatile format for images and animations[2].</li><li><strong>Browser Support</strong>: While AVIF is a powerful and efficient format, it lacks uniform support across browsers, requiring fallbacks to more widely supported formats like WebP, JPEG, or PNG[3].</li><li><strong>Quality</strong>: AVIF provides excellent lossy compression compared to JPG and PNG for visually similar compression levels, resulting in smoother and sharper images with the same file size[5].</li><li><strong>Color Depth</strong>: AVIF supports a higher bit depth of 10 compared to WebP&#39;s 8-bit depth, allowing for a wider range of colors but potentially larger file sizes[5].</li></ul>

              <p>In summary, AVIF excels in compression efficiency, quality retention, and advanced features like HDR and wide color gamut. However, due to limited browser support, it may require fallback options for broader compatibility. On the other hand, PNG remains a widely supported format known for its lossless compression and transparency features.</p>
            

              <h2 className='text-2xl font-semibold mt-5'>What are the key advantages of converting AVIF images to PNG format?</h2>
              <p className='font-normal text-lg'>Converting AVIF images to PNG format can be beneficial for compatibility reasons, as PNG is widely supported across various platforms and browsers. Additionally, PNG files are lossless, preserving image quality without compression artifacts.</p>

              <h2 className='text-2xl font-semibold mt-5'>How does the compression efficiency of AVIF compare to PNG in terms of file size reduction?</h2>
              <p className='font-normal text-lg'>AVIF offers superior compression compared to PNG, resulting in significantly smaller file sizes while maintaining high image quality. This makes AVIF more efficient for storing and transmitting images over the internet.</p>

              <h2 className='text-2xl font-semibold mt-5'>Can you explain the technical differences between AVIF and PNG in terms of encoding algorithms?</h2>
              <p className='font-normal text-lg'>AVIF utilizes advanced compression techniques from the AV1 video codec, allowing for better compression efficiency compared to PNG. PNG, on the other hand, uses lossless compression algorithms that preserve all image data.</p>

              <h2 className='text-2xl font-semibold mt-5'>What are the potential use cases where converting AVIF images to PNG format is beneficial?</h2>
              <p className='font-normal text-lg'>Converting AVIF images to PNG format is beneficial when compatibility with older systems or software that do not support AVIF is required. It can also be useful for archiving images in a widely recognized and lossless format.</p>

              <h2 className='text-2xl font-semibold mt-5'>How does the image quality of AVIF files compare to PNG files after conversion?</h2>
              <p className='font-normal text-lg'>The image quality of AVIF files is generally higher than that of PNG files due to its superior compression efficiency. When converting from AVIF to PNG, the image quality may remain high, but the file size will be larger.</p>

              <h2 className='text-2xl font-semibold mt-5'>Are there any limitations or drawbacks to consider when converting AVIF images to PNG?</h2>
              <p className='font-normal text-lg'>One limitation when converting AVIF images to PNG is the potential increase in file size, as PNG is a lossless format that may not achieve the same level of compression as AVIF.</p>

              <h2 className='text-2xl font-semibold mt-5'>What tools or software can be used to convert AVIF images to PNG format efficiently?</h2>
              <p className='font-normal text-lg'>Various online converters, desktop applications like Filestar, command-line utilities like ImageMagick, and software such as reaConverter can efficiently convert AVIF images to PNG format.</p>

              <h2 className='text-2xl font-semibold mt-5'>How does the conversion process from AVIF to PNG impact transparency and color accuracy in images?</h2>
              <p className='font-normal text-lg'>The conversion process from AVIF to PNG should maintain transparency and color accuracy in images, as both formats support these features. However, it is essential to ensure that the conversion tool preserves these aspects during the process.</p>

              <h2 className='text-2xl font-semibold mt-5'>Are there any specific considerations for web developers when choosing between AVIF and PNG for image optimization?</h2>
              <p className='font-normal text-lg'>Web developers should consider factors such as browser support, image quality requirements, and file size optimization when choosing between AVIF and PNG for web development projects.</p>
            </div>
            <div className='flex justify-around'>
              <div>You can use short url<a href='https://rb.gy/fwxdh'>https://rb.gy/fwxdh</a></div>
              <a href='https://www.douban.com/link2/?url=https%3A%2F%2Faviftopng.top'>click</a>
              <a href='https://link.csdn.net/?target=https%3A%2F%2Faviftopng.top'>go to site</a>
              <a href='https://www.coolapk.com/link?url=https%3A%2F%2Faviftopng.top'>go</a>
            </div>
          </div>}
          {fileList?.length !== 0 && <div className='lg:flex w-full'>
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
