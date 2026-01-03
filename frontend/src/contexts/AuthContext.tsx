import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  setApiUrl,
  palomaURL,
} from '../services/apiConfigService';
import { useTheme } from './ThemeContext';
import { useLanguage, Language } from './LanguageContext';

interface AuthState {
  token: string | null;
  accid: string | null;
  apid: string | null;
  employeeid: string | null;
  wpid: string | null;
  isAuthenticated: boolean;
  isTokenInheriting: boolean;
  isCredentialLogin: boolean;
}

interface SessionData {
  idautomated_point: string;
  idworkplace: string;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  sessionData: SessionData | null;
  handleTokenError: () => void;
  isTokenInheriting: boolean;
  isCredentialLogin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  TOKEN: 'paloma_token',
  ACCID: 'paloma_accid',
  APID: 'paloma_apid',
  EMPLOYEE_ID: 'paloma_employeeid',
  WPID: 'paloma_wpid',
  AUTOMATED_POINT: 'paloma_idautomated_point',
  WORKPLACE: 'paloma_idworkplace',
  IS_TOKEN_INHERIT: 'isTokenInherit',
  IS_CREDENTIAL_LOGIN: 'isCredentialLogin',
} as const;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();

  const [auth, setAuth] = useState<AuthState>(() => {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    const isTokenInherit =
      sessionStorage.getItem(STORAGE_KEYS.IS_TOKEN_INHERIT) === 'true';
    const isCredentialLogin =
      sessionStorage.getItem(STORAGE_KEYS.IS_CREDENTIAL_LOGIN) === 'true';
    return {
      token,
      accid: sessionStorage.getItem(STORAGE_KEYS.ACCID),
      apid: sessionStorage.getItem(STORAGE_KEYS.APID),
      employeeid: sessionStorage.getItem(STORAGE_KEYS.EMPLOYEE_ID),
      wpid: sessionStorage.getItem(STORAGE_KEYS.WPID),
      isAuthenticated: !!token,
      isTokenInheriting: isTokenInherit && !token,
      isCredentialLogin: isCredentialLogin,
    };
  });

  const [isTokenInheriting, setIsTokenInheriting] = useState(() => {
    const isTokenInherit =
      sessionStorage.getItem(STORAGE_KEYS.IS_TOKEN_INHERIT) === 'true';
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    return isTokenInherit && !token;
  });

  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const clearStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) =>
      sessionStorage.removeItem(key),
    );
    localStorage.removeItem('currency');
  };

  const handleTokenError = () => {
    toast.error('Session expired. Please log in again.');
    logout();
    navigate('/login');
  };

  const fetchAndStoreCurrency = useCallback(
    async (token: string, customUrl: string) => {
      try {
        const response = await fetch(`${customUrl}/getReports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
          body: JSON.stringify({
            currency:
              "SELECT key_value, dtedit FROM c_base_config WHERE key_name = 'currency.symbol' AND dtedit IS NOT NULL ORDER BY dtedit DESC LIMIT 1",
          }),
        });

        const data = await response.json();
        if (data?.currency?.[0]?.key_value) {
          localStorage.setItem('currency', data.currency[0].key_value);
        } else {
          localStorage.setItem('currency', '$');
        }
      } catch (error) {
        console.error('Failed to fetch currency symbol:', error);
        localStorage.setItem('currency', '$');
      }
    },
    [],
  );

  useEffect(() => {
    // Set token inheriting state on mount if flag exists
    const isTokenInherit =
      sessionStorage.getItem(STORAGE_KEYS.IS_TOKEN_INHERIT) === 'true';
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);

    if (isTokenInherit && !token) {
      setIsTokenInheriting(true);
      setAuth((prev) => ({ ...prev, isTokenInheriting: true }));
    }

    const handler = async (event: MessageEvent) => {
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:153',message:'Message handler received',data:{type:event.data?.type,hasToken:!!event.data?.token},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-message-handler',hypothesisId:'message-received'})}).catch(()=>{});
      // #endregion
      const { type, token, customUrl, theme, language, accid, apid, employeeid, wpid } = event.data || {};
      console.log('event.data', event.data);
      if (type === 'authentication' && token) {
        // #region agent log
        fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:157',message:'Processing authentication',data:{hasToken:!!token,hasTheme:!!theme,hasLanguage:!!language,hasCustomUrl:!!customUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-message-handler',hypothesisId:'auth-processing'})}).catch(()=>{});
        // #endregion
        
        // Save all authentication data to sessionStorage
        sessionStorage.setItem(STORAGE_KEYS.IS_TOKEN_INHERIT, 'true');
        sessionStorage.removeItem(STORAGE_KEYS.IS_CREDENTIAL_LOGIN);
        
        // Save token and all auth data to sessionStorage
        if (token) {
          sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
        }
        if (accid) {
          sessionStorage.setItem(STORAGE_KEYS.ACCID, accid);
        }
        if (apid) {
          sessionStorage.setItem(STORAGE_KEYS.APID, apid);
        }
        if (employeeid) {
          sessionStorage.setItem(STORAGE_KEYS.EMPLOYEE_ID, employeeid);
        }
        if (wpid) {
          sessionStorage.setItem(STORAGE_KEYS.WPID, wpid);
        }

        // Set theme and language using context functions (which also update localStorage)
        // Default to system theme if not provided
        const themeToSet = theme || 'system';
        setTheme(themeToSet as 'light' | 'dark' | 'system');
        
        // Default to English if not provided
        const languageToSet = language || 'en';
        setLanguage(languageToSet as Language);

        if (customUrl) {
          setApiUrl(customUrl);
          // Save customUrl to sessionStorage for child apps
          sessionStorage.setItem('paloma_customUrl', customUrl);
        }

        setIsTokenInheriting(true);
        setAuth((prev) => ({ ...prev, isTokenInheriting: true }));

        await fetchAndStoreCurrency(token, customUrl || palomaURL);

        setAuth((prev) => ({
          ...prev,
          token,
          accid: accid || null,
          apid: apid || null,
          employeeid: employeeid || null,
          wpid: wpid || null,
          isTokenInheriting: false,
          isAuthenticated: true,
          isCredentialLogin: false,
        }));
        setIsTokenInheriting(false);
        try {
          await fetchSessionData(token);
          // #region agent log
          fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:200',message:'Authentication successful, navigating to dashboard',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-message-handler',hypothesisId:'auth-success'})}).catch(()=>{});
          // #endregion
          navigate('/dashboard');
        } catch (error) {
          // #region agent log
          fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:204',message:'Authentication failed, navigating to login',data:{error:error instanceof Error ? error.message : 'Unknown error'},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-message-handler',hypothesisId:'auth-failure'})}).catch(()=>{});
          // #endregion
          setIsTokenInheriting(false);
          setAuth((prev) => ({ ...prev, isTokenInheriting: false }));
          navigate('/login');
        }
        return;
      } else {
        setIsTokenInheriting(false);
        setAuth((prev) => ({ ...prev, isTokenInheriting: false }));
        navigate('/login');
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, [navigate, setTheme, setLanguage, fetchAndStoreCurrency]);

  const logout = () => {
    clearStorage();
    setAuth({
      token: null,
      accid: null,
      apid: null,
      employeeid: null,
      wpid: null,
      isAuthenticated: false,
      isTokenInheriting: false,
      isCredentialLogin: false,
    });
    setSessionData(null);
    toast.info('Logged out successfully');
    window.location.replace('/login');
  };

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.IS_TOKEN_INHERIT);
      sessionStorage.setItem(STORAGE_KEYS.IS_CREDENTIAL_LOGIN, 'true');

      setApiUrl('https://posapi.palomapos.com/api/v1.9');

      const response = await fetch(`${palomaURL}/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({ login: username, password }),
      });

      const data = await response.json();

      if (!data.token) {
        toast.error('Authentication failed');
        return false;
      }

      const authData = {
        [STORAGE_KEYS.TOKEN]: data.token,
        [STORAGE_KEYS.ACCID]: data.accid || '',
        [STORAGE_KEYS.APID]: data.apid || '',
        [STORAGE_KEYS.EMPLOYEE_ID]: data.employeeid || '',
        [STORAGE_KEYS.WPID]: data.wpid || '',
      };

      Object.entries(authData).forEach(([key, value]) => {
        sessionStorage.setItem(key, value);
      });

      setAuth({
        token: data.token,
        accid: data.accid || null,
        apid: data.apid || null,
        employeeid: data.employeeid || null,
        wpid: data.wpid || null,
        isAuthenticated: true,
        isTokenInheriting: false,
        isCredentialLogin: true,
      });

      await fetchAndStoreCurrency(
        data.token,
        'https://posapi.palomapos.com/api/v1.9',
      );

      await fetchSessionData(data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        'Failed to login. Please check your credentials and try again.',
      );
      return false;
    }
  };

  async function fetchSessionData(token: string) {
    if (!token) return;

    try {
      const response = await fetch(`${palomaURL}/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          limit: 1,
          table: 'd_changes',
        }),
      });

      const data = await response.json();

      if (data?.message === 'Token is invalid' && data?.error === '102') {
        handleTokenError();
        return;
      }

      if (data.data?.[0]) {
        const newSessionData = {
          idautomated_point: data.data[0].idautomated_point,
          idworkplace: data.data[0].idworkplace,
        };

        setSessionData(newSessionData);
        sessionStorage.setItem(
          STORAGE_KEYS.AUTOMATED_POINT,
          newSessionData.idautomated_point,
        );
        sessionStorage.setItem(
          STORAGE_KEYS.WORKPLACE,
          newSessionData.idworkplace,
        );
      }
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: true,
        };
      });
    } catch (error) {
      console.error('Error fetching session data:', error);
      toast.error('Failed to fetch session data');
    }
  }

  const contextValue: AuthContextType = {
    ...auth,
    login,
    logout,
    sessionData,
    handleTokenError,
    isTokenInheriting,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};



