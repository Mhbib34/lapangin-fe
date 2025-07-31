import { booking, BookingStatus } from "@/type/bookings";
import { Format } from "@/utils/format";
import { Calendar, Clock } from "lucide-react";

type Props = {
  activeView: string;
  mockBookings: booking[];
};

const SidebarContent = ({ activeView, mockBookings }: Props) => {
  switch (activeView) {
    case "bookings":
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Booking Saya</h3>
          {mockBookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">
                  {booking.field.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === BookingStatus.CONFIRMED
                      ? "bg-green-500/20 text-green-300"
                      : booking.status === BookingStatus.PENDING
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="text-white/70 text-sm space-y-1">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{Format.formatDate(booking.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{Format.formatTime(booking.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    // case "notifications":
    //   return (
    //     <div className="space-y-4">
    //       <h3 className="text-xl font-bold text-white mb-4">Notifikasi</h3>
    //       {notifications.map((notification) => (
    //         <div
    //           key={notification.id}
    //           className={`backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 cursor-pointer transition-all hover:bg-white/20 ${
    //             !notification.read ? "border-cyan-400/50" : ""
    //           }`}
    //           onClick={() => markNotificationAsRead(notification.id)}
    //         >
    //           <div className="flex justify-between items-start mb-2">
    //             <h4 className="font-semibold text-white">
    //               {notification.title}
    //             </h4>
    //             {!notification.read && (
    //               <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
    //             )}
    //           </div>
    //           <p className="text-white/70 text-sm mb-1">
    //             {notification.message}
    //           </p>
    //           <p className="text-white/50 text-xs">{notification.time}</p>
    //         </div>
    //       ))}
    //     </div>
    //   );

    // case "favorites":
    //   const favoriteFieldsData = mockFields.filter((field) =>
    //     favoriteFields.includes(field.id)
    //   );
    //   return (
    //     <div className="space-y-4">
    //       <h3 className="text-xl font-bold text-white mb-4">Favorit Saya</h3>
    //       {favoriteFieldsData.map((field) => (
    //         <div
    //           key={field.id}
    //           className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20"
    //         >
    //           <div className="flex justify-between items-start mb-2">
    //             <h4 className="font-semibold text-white">{field.name}</h4>
    //             <button
    //               onClick={() => toggleFavorite(field.id)}
    //               className="text-red-400 hover:text-red-300 transition-colors"
    //             >
    //               <Heart className="w-5 h-5 fill-current" />
    //             </button>
    //           </div>
    //           <div className="flex items-center space-x-2 text-white/70 text-sm mb-2">
    //             <MapPin className="w-4 h-4" />
    //             <span>{field.location}</span>
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center space-x-1">
    //               <Star className="w-4 h-4 text-yellow-400 fill-current" />
    //               <span className="text-white text-sm">{field.rating}</span>
    //             </div>
    //             <span className="text-cyan-300 font-semibold">
    //               {formatPrice(field.price)}/jam
    //             </span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   );

    default:
      return null;
  }
};

export default SidebarContent;
