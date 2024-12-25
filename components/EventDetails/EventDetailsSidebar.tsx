import React from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import { IAuthor } from '../../interfaces/author';
import formatDate from '../../helpers/formatDate';
import DOMPurify from 'isomorphic-dompurify';

const EventDetailsSidebar = (sidebar) => {

   return typeof sidebar?.data !== 'undefined' ? (
      <>
         {sidebar?.data.authors && sidebar?.data.authors.map((author: IAuthor) => (
            <div className="sidebar-widget-wrapper" key={uuidv4()}>
               <div className="event-speaker-wrapper mb-30">
                  <div className="event-speaker-info">
                     <h4>Speaker</h4>
                  </div>
                  <div className="event-sidebar-thumb w-img">
                     <Link href={`/instructor/${author.slug}`} legacyBehavior>
                        <a><img src={getImage(author.logo_url)} alt="Speaker" /></a>
                     </Link>
                  </div>
                  <div className="event-speaker-content text-center">
                     <span><Link href={`/instructor/${author.slug}`} legacyBehavior><a>{author.salute_name ? author.salute_name + ' ' : ''}{author.titel_name ? author.titel_name + ' ' : ''}{author.first_name + ' ' + author.last_name}</a></Link></span>
                     <p>{author.designation}</p>
                  </div>
               </div>
               <div className="event-information-wrapper mb-30">
                  <div className="event-price-info">
                     <div className="event-ticket-cost">
                        <span>Ticket Cost</span>
                     </div>
                     <div className="event-price">
                        <span>{sidebar.data.price}</span>
                     </div>
                  </div>
                  <div className="event-information-list">
                     <ul>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-calendar"></i>
                              <span>Date</span>
                           </div>
                           <div className="information-list">
                              <span>{formatDate(sidebar.data.start_datetime)}</span>
                           </div>
                        </li>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-clock"></i>
                              <span>Schedule</span>
                           </div>
                           <div className="information-list">
                              <span>{formatDate(sidebar.data.start_datetime)} - {formatDate(sidebar.data.end_datetime)}</span>
                           </div>
                        </li>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-place"></i>
                              <span>Location</span>
                           </div>
                           <div className="information-list">
                              <span>{sidebar.data.location}</span>
                           </div>
                        </li>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-menu-2"></i>
                              <span>Category</span>
                           </div>
                           <div className="information-list">
                              <span>{sidebar.data.category.title}</span>
                           </div>
                        </li>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-global"></i>
                              <span>Laguage</span>
                           </div>
                           <div className="information-list">
                              <span>English</span>
                           </div>
                        </li>
                        <li>
                           <div className="information-list">
                              <i className="flaticon-bookmark-white"></i>
                              <span>Estimated Seat</span>
                           </div>
                           <div className="information-list">
                              <span>{sidebar.data.available_seat} {sidebar.data.available_seat > 1 ? "Seats" : "Seat"}</span>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sidebar.data.join_url) }} />
               </div>
            </div>
         ))}
      </>
   ) : null
};

export default EventDetailsSidebar;