// src/core/hooks/useTenant.ts
import { useParams } from 'react-router-dom';

/**
 * URL 파라미터에서 tenantId를 안전하게 추출합니다.
 * @returns tenantId (string | undefined)
 */
export const useTenant = () => {
    const { tenantId } = useParams<{ tenantId: string }>();
    return { tenantId };
};
