import { useNavigate } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import brandColors from '../styles/brandColors';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function SelectorDeCalculadoras({product, selectedVariant}) {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen">
            <div
                className="flex flex-col items-center justify-center min-h-screen p-4"
                style={{ backgroundColor: brandColors.lightGray2 }}
            >
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl sm:text-5xl font-extrabold mb-2"
                        style={{ color: brandColors.primary }}
                    >
                        Bienvenido/a
                    </h1>
                    <p
                        className="text-xl"
                        style={{ color: brandColors.darkBlue }}
                    >
                        Selecciona la calculadora que deseas utilizar
                        </p>
                </div>
                <div className="w-full max-w-md flex flex-col gap-6">
                    <div className="w-full text-center bg-purple py-2 px-4 mb-8 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                        <CartForm route="/cart" inputs={{lines: [{
                            merchandiseId: selectedVariant.id,
                            quantity: 1,
                            selectedVariant,
                            }]}} action={CartForm.ACTIONS.LinesAdd}
                        >
                            {(fetcher) => (
                                <>
                                    <input
                                        name="acceleratedCheckout"
                                        type="hidden"
                                        value="true"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full"
                                        // disabled={fetcher.state !== 'idle'}
                                    >
                                        Comprar Acceso
                                    </button>
                                </>
                            )}
                        </CartForm>
                    </div>
                    <button
                        onClick={() => navigate('/calculadora-precios')}
                        className="w-full text-center py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        style={{ backgroundColor: brandColors.primary, boxShadow: '0 6px 15px -3px rgba(79, 8, 57, 0.5)' }}
                    >
                        Calculadora para Negocios
                        <span className="block text-sm font-normal mt-1 opacity-90">(Costos, Precios, Margen de Productos)</span>
                    </button>

                    <button
                        onClick={() => navigate('/calculadora-servicios')}
                        className="w-full text-center py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        style={{ backgroundColor: brandColors.blue2, boxShadow: '0 6px 15px -3px rgba(91, 128, 152, 0.5)' }}
                    >
                        Calculadora para Servicios
                        <span className="block text-sm font-normal mt-1 opacity-90">(Precios por hora)</span>
                    </button>

                    <button
                        onClick={() => navigate('/calculadora-utilidad')}
                        className="w-full text-center py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        style={{ backgroundColor: brandColors.green2, boxShadow: '0 6px 15px -3px rgba(91, 128, 152, 0.5)' }}
                    >
                        Calculadora de Utilidad
                        <span className="block text-sm font-normal mt-1 opacity-90">(Incluyendo comisiones)</span>
                    </button>
                </div>
                <div className="text-center mt-12">
                    <p className="text-sm" style={{ color: brandColors.darkBlue }}>
                        Desarrollado por Taylin Luzcando
                    </p>
                    <p className="text-xs text-gray-500 mt-4 px-2" style={{ color: brandColors.darkBlue }}>
                        El desarrollo de estas calculadoras y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial.
                    </p>
                </div>
            </div>
        </div>
    );
}