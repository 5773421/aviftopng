import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Ease of Use',
    description:
      'No need to download software; these tools work directly in your browser.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Batch Conversion',
    description:
      'Convert multiple files simultaneously, saving time and effort.',
    icon: LockClosedIcon,
  },
  {
    name: 'High-Quality Output',
    description:
      'Maintain the original image quality with advanced settings.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Security',
    description:
      'Process images online without uploading files. No need to upload files, more privacy. aviftopng.top all tools are implemented using browser technology.',
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Quickly process image formats</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Convert your AVIF images to PNG format with ease.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
              Converting AVIF to PNG is a practical solution to ensure your images are widely compatible without sacrificing quality.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
