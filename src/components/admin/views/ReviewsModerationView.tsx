import React, { useState } from 'react';
import { CheckSquare, Star, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { db } from '../../../services/db';
import { Review } from '../../../types';

export const ReviewsModerationView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => db.getReviews());

  const handleToggleApprove = (id: string, currentStatus: boolean) => {
    db.approveReview(id, !currentStatus);
    setReviews(db.getReviews());
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      db.deleteReview(id);
      setReviews(db.getReviews());
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" /> Yorumlar & Değerlendirme Moderasyonu
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Ziyaretçiler tarafından profillere yazılan yorumların onaylanması veya silinmesi
        </p>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-xs">{rev.authorName}</span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleApprove(rev.id, rev.isApproved)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  rev.isApproved
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                {rev.isApproved ? 'ONAYLI' : 'ONAY BEKLİYOR'}
              </button>

              <button
                onClick={() => handleDelete(rev.id)}
                className="p-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white transition-all"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
