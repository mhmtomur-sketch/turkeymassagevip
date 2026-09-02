import React, { useState } from 'react';
import { Star, MessageSquare, Send, ShieldCheck } from 'lucide-react';
import { Review } from '../../types';
import { db } from '../../services/db';

interface ReviewSectionProps {
  profileId: string;
  initialRating: number;
  initialReviewCount: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  profileId,
  initialRating,
  initialReviewCount,
}) => {
  const [reviews, setReviews] = useState<Review[]>(() => db.getReviews(profileId));
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      setErrorMsg('Lütfen adınızı ve yorumunuzu giriniz.');
      return;
    }
    if (comment.trim().length < 10) {
      setErrorMsg('Yorumunuz en az 10 karakter olmalıdır.');
      return;
    }

    const newRev = db.addReview({
      profileId,
      authorName: authorName.trim(),
      rating,
      comment: comment.trim(),
    });

    setReviews([newRev, ...reviews]);
    setAuthorName('');
    setComment('');
    setErrorMsg('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-6">
      
      {/* Header & Overall Rating */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            Müşteri Yorumları & Değerlendirmeler ({reviews.length})
          </h3>
          <span className="text-xs text-slate-400">Doğrulanmış konuk deneyimleri</span>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-dark-900/80 border border-white/10">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-base font-black">{initialRating}</span>
          </div>
          <span className="text-xs text-slate-400">/ 5.0 Memnuniyet</span>
        </div>
      </div>

      {/* Write a Review Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-dark-900/60 border border-white/5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Deneyiminizi Paylaşın
        </h4>

        {errorMsg && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
            {errorMsg}
          </div>
        )}

        {isSuccess && (
          <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Yorumunuz başarıyla kaydedildi ve yayınlandı!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Adınız / Rumuz</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Örn: Mehmet B."
              className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Puanınız</label>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-400 ml-2">{rating}.0</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Yorumunuz</label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Aldığınız masaj seansı, hijyen ve memnuniyetinizi paylaşın..."
            className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:theme-accent-border"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
        >
          <Send className="w-3.5 h-3.5" /> Yorumu Gönder
        </button>
      </form>

      {/* Review List */}
      <div className="space-y-3 pt-2">
        {reviews.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-dark-900/40 border border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="font-bold text-slate-200">{rev.authorName}</div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                  <span className="text-[10px] text-slate-500 ml-1">{rev.date}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
