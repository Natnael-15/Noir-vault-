import { motion } from 'motion/react';
import { Quote, Sparkles, Compass, Eye } from 'lucide-react';
import { AtelierMaterialExplorer } from '../components/AtelierMaterialExplorer';

export function EditorialScreen() {
    const stories = [
        {
            title: "01 // THE MANIFESTO",
            subtitle: "Redefining Structural Brutalism",
            text: "Noir Vault was established on the principle of architectural rigor in haute couture. Every piece is constructed not merely as apparel, but as a deliberate shield against modern clutter. We reject transient trends, opting instead for monolithic silhouettes and uncompromising geometry.",
            size: "col-span-1 md:col-span-8 bg-surface",
            icon: <Compass className="w-6 h-6 text-primary" />
        },
        {
            title: "02 // DISCIPLINE",
            subtitle: "Uncompromising Sourcing",
            text: "We collaborate exclusively with heritage mills in Biella, Italy and Kojima, Japan. Every millimeter of virgin wool and custom-dyed cotton is certified for ethical chain of custody, ensuring our materials outlast generations.",
            size: "col-span-1 md:col-span-4 bg-primary text-background",
            icon: <Sparkles className="w-6 h-6 text-background" />
        },
        {
            title: "03 // RADICAL HONESTY",
            subtitle: "The Production Cycle",
            text: "Production is limited to 100 units worldwide per archive designation. Our workshop operates under a zero-overflow commitment. When a collection is fully archived, patterns are locked and cataloged forever. This guarantees absolute scarcity and prevents excess manufacturing waste.",
            size: "col-span-1 md:col-span-4 bg-surface",
            icon: <Eye className="w-6 h-6 text-primary" />
        },
        {
            title: "04 // THE ARCHITECT",
            subtitle: "Symmetry in Motion",
            text: "We build for movement. Our custom three-dimensional shoulder framing and signature asymmetric hems allow heavy-gauge trench coats to gracefully shift and flow with organic strides. We achieve visual weight and spatial integrity without sacrificing ease of motion.",
            size: "col-span-1 md:col-span-8 bg-surface-dim",
            icon: <Quote className="w-6 h-6 text-on-surface" />
        }
    ];

    const lookbookHighlights = [
        {
            tag: "FW26 COLLECTION",
            title: "Obsidian Contrast Study",
            desc: "A exploration of absolute matte black wool juxtaposed against mirror-finish custom hardware.",
            image: "/assets/obsidian-parka.jpeg"
        },
        {
            tag: "MATERIAL FOCUS",
            title: "Italian Virgin Wool",
            desc: "Sourced from high-altitude farms, our heavy 620GSM virgin wool offers unmatched thermal properties and deep tonal depth.",
            image: "/assets/heavyweight-pullover.jpeg"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-24 pb-12 flex flex-col gap-8"
        >
            {/* Header section styled elegantly */}
            <div className="bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span className="text-xs font-bold text-on-surface uppercase tracking-widest block mb-2">Philosophy</span>
                    <h1 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-on-background">
                        Editorial Lookbook
                    </h1>
                </div>
                <div className="max-w-md text-sm text-on-surface leading-relaxed">
                    A quiet study in materials, methodology, and absolute spatial restraint.
                </div>
            </div>

            {/* Stories Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {stories.map((story, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className={`${story.size} border border-outline rounded-3xl p-8 flex flex-col justify-between shadow-sm min-h-[300px] transition-all duration-300`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className={`text-xs font-bold tracking-widest ${story.size.includes('bg-primary') ? 'text-background/60' : 'text-on-surface'}`}>
                                {story.title}
                            </span>
                            <div className={`p-2 rounded-xl ${story.size.includes('bg-primary') ? 'bg-background/10' : 'bg-background'}`}>
                                {story.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className={`font-display font-bold text-2xl tracking-tight mb-2 ${story.size.includes('bg-primary') ? 'text-background' : 'text-on-background'}`}>
                                {story.subtitle}
                            </h3>
                            <p className={`text-sm leading-relaxed ${story.size.includes('bg-primary') ? 'text-background/80' : 'text-on-surface'}`}>
                                {story.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lookbook Visual Study Card (Bento Row) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {lookbookHighlights.map((hl, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -4 }}
                        className="bg-surface border border-outline rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col md:flex-row gap-6 min-h-[340px] group/item cursor-pointer"
                    >
                        <div className="md:w-1/2 overflow-hidden rounded-2xl bg-surface-dim relative aspect-square md:aspect-auto">
                            <img 
                                src={hl.image} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                                alt={hl.title} 
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-between py-2">
                            <div>
                                <span className="text-xs font-bold text-primary tracking-widest block mb-2">{hl.tag}</span>
                                <h3 className="font-display font-bold text-2xl tracking-tight text-on-background mb-3">{hl.title}</h3>
                                <p className="text-sm text-on-surface leading-relaxed">{hl.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-outline/50 mt-4">
                                <span className="text-xs font-mono text-on-surface uppercase">Archival Plate // 00{i+1}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Interactive Atelier Loom & Micro Weave Fiber Study */}
            <AtelierMaterialExplorer />
        </motion.div>
    );
}
