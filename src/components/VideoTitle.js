import { useTranslation } from 'react-i18next'

const VideoTitle = ({title, overview}) => {
  const { t } = useTranslation();

  return (
    <div className='pt-[20%] px-24 absolute bg-gradient-to-r from-black text-white w-full aspect-video'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/2'>{overview}</p>
        <div>
            <button className='bg-white px-10 p-2 font-bold rounded-md text-black hover:bg-opacity-50'>{t("play")}</button>
            <button className='bg-gray-500 px-10 p-2 text-white font-bold rounded-md mx-2 bg-opacity-50'>{t("more_info")}</button>
        </div>
    </div>
  )
}

export default VideoTitle