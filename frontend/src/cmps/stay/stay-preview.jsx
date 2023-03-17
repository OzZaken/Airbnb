import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
/* services */
import { utilService } from '../../services/util.service'
import { locService } from '../../services/loc.service'
import { userService } from '../../services/user.service'
/* cmps */
import { ImgGallery } from '../system/img-gallery'
import OnlyIcon from '../app-icon'
/* actions *//* UI UX *//* hooks */

export const StayPreview = ({ stay, onToggleIsInWishlist, onClickPreviewImg: onClickImg, loggedInUser }) => {
    /* 👣 User distance ~ Calc Distance between stay and user */
    const { loc } = stay
    const [userDistance, setUserDistance] = useState(null)
    // setUserDistance(locService.getUserDistance(loc))

    /* 📝 Wishlist ~ check if contains stay._id */
    const { likedByUsers } = stay
    const isOnWishList = useRef(loggedInUser ? likedByUsers.includes(loggedInUser._id) : false)

    /* 🖼 Gallery */
    const { imgUrls, _id } = stay
    const galleryImgsProps = imgUrls.slice(0, 5).map((url, idx) => ({
        original: url,
        originalClass: "img-gallery-img",
        // originalTitle: `${stay.name} #${idx + 1}`, // Optional
        originalAlt: `${stay.name} #${idx + 1}`,
        originalIndex: idx,
        onClick: () => { onClickImg(idx, _id) },
        originalObjectFit: "cover",
    })).flat() /* remove the extra layer of array */

    const previewGalleryProps = {
        items: galleryImgsProps,
        infinite: false,
        startIndex: 0,
        additionalClass: 'preview-gallery',
        showPlayButton: false,
        autoPlay: false,
        showIndex: false,
        showFullscreenButton: false,
        showBullets: true,
        showThumbnails: false,
        useBrowserFullscreen: false,
        loading: 'lazy',
        lazyLoad: true,
    }

    /* stay Intersection Observer */
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)

            /* if already visible unobserve*/
            if (entry.isIntersecting) observer.unobserve(entry.target)

        }, { threshold: 1, rootMargin: '0px 0px 250px 0px' })

        if (ref.current) observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    // todo: last stay Intersection Observer :
    const lastPreviewIntersection = () => {
        /* Toggle .show if stay is Intersecting */
        const elLastStayObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0]
            if (!lastCard.isIntersecting) return
            // onLoadMoreStays()

            elLastStayObserver.unobserve(lastCard.target)
            elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
        }, {})

        elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
    }

    /* Dummy: Discount,Rate,watches*/
    const { numberWithCommas, getRandomFloatInclusive, getRandomIntInclusive } = utilService
    const isDiscount = useRef(Math.random() < 0.5)
    const RandRate = useRef(getRandomFloatInclusive(4, 5, 2))
    const watchesCount = useRef(getRandomIntInclusive(10000, 70000))

    const { propertyType, price, summary } = stay
    const { city } = loc

    return <article className={`stay-preview ${isIntersecting ? 'show' : ''}`} ref={ref}>
        <div className="gallery-container">
            {/* WishList */}
            {loggedInUser && <button className='image-gallery-custom-action' onClick={ev => { onToggleIsInWishlist(stay); ev.stopPropagation() }} >
                {isOnWishList ? <OnlyIcon iconKey='Favorite' /> : <OnlyIcon iconKey='FavoriteFill' />}
            </button>}

            <ImgGallery viewProps={previewGalleryProps} />
        </div>

        <Link to={`/stay/${_id}`} className="link-container">
            {/*  heading */}
            <span className="txt heading">
                {propertyType} in {city}
            </span>

            {/* summary */}
            <span className="txt summary">
                {summary}
            </span>

            {/*👣 userDistance || stay watches 👀 */}
            {userDistance ? <span className="txt distance">
                {numberWithCommas(userDistance)} kilometers
            </span> : <span className="txt views-count">
                {numberWithCommas(watchesCount.current)} watches this month
            </span>}

            {/* $ price */}
            <div className="txt price">
                {isDiscount.current && <span className="full-night-price">
                    ${numberWithCommas((price * 1.3).toFixed())}&nbsp;
                </span>}

                <span className="night-price">
                    ${numberWithCommas(price)}&nbsp;
                </span>
                <span className="night">night</span>
            </div>

            {/*⭐ rate */}
            <span className="rate">
                {<OnlyIcon className="fs-small" iconKey="Star" />}
                {RandRate.current}
            </span>
        </Link>
    </article>
}

/* TODO: 
! 🐞 fix bug: setUserDistance(locService.getUserDistance(loc))
Todo: useIntersect.
Todo: by Users Rates 1-5 ⭐.
Todo: isDiscount by Host 
Todo: const firstShowingImgIdx = 0 // const mostLikeImgIdx = getMostLikeImgIdx || 0
Todo: UI UX.
*/