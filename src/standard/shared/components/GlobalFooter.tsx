import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const GlobalFooter = () => {
  const { t } = useCoreTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 border-t border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
      <p>
        &copy; {year} BuptleBiz. {t('footer.rights')}
      </p>
      <div className="mt-3 flex justify-center gap-6">
        <a href="#" className="hover:text-slate-900 transition-colors">
          {t('footer.terms')}
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          {t('footer.privacy')}
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          {t('footer.contact')}
        </a>
      </div>
    </footer>
  );
};

export default GlobalFooter;

