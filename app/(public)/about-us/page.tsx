"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaMapMarkerAlt, FaHandshake, FaClock, FaGlobe } from 'react-icons/fa';

const AboutUsPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="container mx-auto p-6 space-y-8"
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-600">
                    Pourquoi choisir Sosep Express ?
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                    Chez <span className="font-semibold italic">Sosep Express</span>, nous sommes déterminés à offrir un service de transport aérien rapide et fiable. Voici pourquoi vous devriez nous choisir :
                </p>
            </div>

            <motion.div
                className="flex flex-col space-y-8"
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 50 }}
            >
                <div className="flex items-start space-x-4">
                    <FaHandshake className="text-blue-600 w-8 h-8 mt-1" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Relation Privilégiée avec nos Partenaires Aériens
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Nous nous appuyons sur une relation privilégiée avec nos partenaires aériens pour développer rapidement nos services de transport. Cette collaboration nous permet d&apos;offrir des solutions logistiques aériennes efficaces et de haute qualité.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-green-600 w-8 h-8 mt-1" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Développement Rapide en Afrique
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Nous avons actuellement 23 succursales à travers l&apos;Afrique, ce qui témoigne de notre croissance rapide et de notre engagement envers le marché africain. Ces succursales nous permettent de fournir un service de proximité à nos clients dans toute la région.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaClock className="text-yellow-600 w-8 h-8 mt-1" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Engagement envers l&apos;Efficacité et la Qualité
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Notre mission est de construire une marque synonyme d&apos;efficacité et de qualité. Nous nous engageons à fournir un service de grande quantité, adapté aux besoins spécifiques de nos clients. Notre objectif est de garantir la satisfaction et la confiance de nos partenaires et clients.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <FaGlobe className="text-red-600 w-8 h-8 mt-1" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Nos Domaines de Spécialisation
                        </h2>
                        <ul className="text-gray-600 mt-2 list-disc list-inside">
                            <li><span className="font-semibold italic">Air Express International</span> : Un service rapide et fiable pour vos envois urgents à l&apos;international.</li>
                            <li><span className="font-semibold italic">Transport Aérien International</span> : Des solutions de transport adaptées à vos besoins, partout dans le monde.</li>
                            <li><span className="font-semibold italic">Projets Logistiques Internationaux</span> : Une expertise dans la gestion de projets logistiques complexes à l&apos;échelle internationale.</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 50 }}
                className="text-center space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Conclusion</h2>
                <p className="text-gray-600">
                    Faites confiance à Sosep Express pour vos besoins en transport aérien et logistique. Notre expertise, notre réseau de partenaires et notre présence en Afrique nous permettent de vous offrir un service de qualité supérieure, adapté à vos exigences.
                </p>
                <p className="text-blue-600 font-semibold italic">
                    Contactez-nous dès aujourd&apos;hui pour découvrir comment Sosep Express peut vous aider à atteindre vos objectifs logistiques avec efficacité et fiabilité.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Branch&apos;s:
                </h2>
                <ul className="text-gray-600 space-y-2 list-inside list-disc">
                    <li>Éthiopie - Addis-Abeba : Bole S/city，Woreda 02, House No 54 (At the back of Japan Embassy) 卢旺达市场 AGGE GUEST HOUSE 泛非速运旁</li>
                    <li>Tanzanie - Dar es Salaam : Plot No.165, Migombani Street (Near to Chato Street), Mikocheni A, Dar es Salaam, Tanzania 坦桑尼亚，达累斯萨拉姆，米扣切尼，米工吧尼路，165号</li>
                    <li>Nigeria - Lagos : 拉各斯伊柯贾榕榕圆餐厅对面小区16(16A, Sule Abukar Crescent, Off Opebi Road, Ikeja, Lagos.)</li>
                    <li>Nigeria - Abuja : Wuse 2. Parakou street no 61 in Abuja</li>
                    <li>Ghana - Accra : North industrial area keneshie plot 57 58 Accra Ghana</li>
                    <li>Zambie - Lusaka : NO.5231 , Makishi road ,lusaka No.26, Central Street, cross road of 14th Street ,Nkana East, Kitwe</li>
                    <li>Congo (RDC) - Kinshasa : 481,Blvd Lumumba Limete,Kinshasa-RDC</li>
                    <li>Congo (RDC) - lubumbashi : ave chaussée de kensenga, N 10, bel-air,C/kampemba, lubumbashi.</li>
                    <li>République du Congo - Brazzaville : 1572AV.3MARTIR, BRAZZAVILLE</li>
                    <li>République du Congo - pointe noire : 黑角香港旅馆楼下(Av bord-bord de km4 derriere air liqude PNR)</li>
                    <li>Cameroun - Douala : Douala Cameroun akwa boulevard presidencial</li>
                    <li>Djibouti - Djibouti : </li>
                    <li>Côte d&apos;Ivoire - abidjan : La Rue des Jardin en face de NICE CREAM et a côté de BANQUE NSIA, vallon, 2 plateaux, Abidjan</li>
                    <li>Mali - Bamako : 大家乐超市(Niarela Rue 453-Porte 241,Bamako)</li>
                    <li>Gabon - Libreville : lalala a droite</li>
                    <li>Rwanda - Kigali : KK 6 Ave, Next to Spedag Interfreight Rwanda Ltd/Opposite to UAP Insurance, Gikondo, Kicukiro,</li>
                    <li>Guinée Équatoriale - Malabo : GUINEA ECUATORIAL DEI ESTABLECIMEINTO</li>
                    <li>Sénégal - Dakar : Station Shell en face de &quot;Chez Katia&quot;, Route de l&apos;aéroport, Ngor/Almadies, Dakar, Sénégal</li>
                    <li>Madagascar - Antananarivo : Antananarivo Madagascar Rainimanga Rahanamy Road lot VQ135GAA Mandroseza TANA2</li>
                    <li>Malawi - Lilongwe : No.274 Area6 lilongwe Malawi</li>
                    <li>Guinée - Conakry : 科纳克里clinique pasteur 斜对面，福万家超市旁边（Quartier Manquepas , Commune de Kaloum , Immeuble en face du supermarché ZCO , non loin de la clinique Pasteur）</li>
                    <li>Burkina Faso - Ouagadougou : En face de Brussels Airlines. (restaurant chinois) KULUBA OU OUAGA</li>
                    <li>Bénin - Cotonou : NAC IMENTO RITA CARREbu16</li>
                    <li>Afrique du Sud - Johannesburg : 4 Minuhshka Estate, Vlei Avenue, Pomona，,Johannesburg, South Africa</li>
                    <li>Niger - Niamey : 中尼友谊大桥走完,右转,第一个加油站前方20米有指示牌(Domo hotel) Hotel residence Domo rive droite</li>
                    <li>Botswana - Gaborone : Plot 37327 Kolonkwaneng, block 8,Gaborone（谷歌地图搜索：IAEXPBotswana）</li>
                    <li>Tchad - N&apos;Djamena : Quartier Farcha zone Industrielle</li>
                    <li>Togo - Lomé : Rue Houlata a cote de la pharmacie Ocean lome Togo</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default AboutUsPage;
