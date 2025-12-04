/**
 * Animation Service v3.0 (Simplified)
 * Motion definitions and educational content for anatomy study.
 * Used by AnimationBrowser and AdvancedAnimationViewer for resource lookup.
 * 
 * Note: 3D model rendering removed in v3.0. This service retains motion
 * definitions and educational content for the resource browser.
 */

// Simple Vector3 type to replace THREE.Vector3 (no longer used for rendering)
type Vector3 = { x: number; y: number; z: number };
const vec3 = (x: number, y: number, z: number): Vector3 => ({ x, y, z });

// ============================================================================
// 3D MODEL TAG DEFINITIONS - Direct from GLB Files
// ============================================================================

/**
 * Complete node tags from hand_glb_tags.txt, lower_limb_glb_tags.txt, upper_limb_glb_tags.txt
 * These are the actual mesh/bone names available in the 3D models for animation control.
 */

export const MODEL_TAGS = {
  // ============================================================================
  // HAND MODEL TAGS (hand_glb_tags.txt)
  // ============================================================================
  hand: {
    bones: [
      '1st metacarpal bone', '2nd metacarpal bone', '3rd metacarpal bone', '4th metacarpal bone', '5th metacarpal bone',
      'Capitate', 'Hamate', 'Lunate bone', 'Pisiform', 'Scaphoid', 'Trapezium', 'Trapezoid', 'Triquetrum',
      'Distal phalanx of 1st finger', 'Distal phalanx of 2d finger', 'Distal phalanx of 3d finger', 'Distal phalanx of 4th finger', 'Distal phalanx of 5th finger',
      'Middle phalanx of 2d finger', 'Middle phalanx of 3rd finger', 'Middle phalanx of 4th finger', 'Middle phalanx of 5th finger',
      'Proximal phalanx of 1st finger', 'Proximal phalanx of 2d finger', 'Proximal phalanx of 3rd finger', 'Proximal phalanx of 4th finger', 'Proximal phalanx of 5th finger',
      'Radius', 'Ulna', 'Sesamoid bones'
    ],
    muscles: [
      '1st dorsal interosseus of hand', '2nd dorsal interosseus of hand', '3rd dorsal interosseus of hand', '4th dorsal interosseus of hand',
      '1st lumbrical of hand', '2nd lumbrical of hand', '3rd lumbrical of hand', '4th lumbrical of hand',
      '1st palmar interosseus of hand', '2nd palmar interosseus of hand', '3rd palmar interosseus of hand',
      'Abductor digiti minimi', 'Abductor pollicis brevis', 'Abductor pollicis longus',
      'Adductor pollicis', 'Oblique head of adductor pollicis', 'Transverse head of adductor pollicis',
      'Brachioradialis muscle', 'Deep head of flexor pollicis brevis', 'Superficial head of flexor pollicis brevis',
      'Extensor carpi radialis brevis', 'Extensor carpi radialis longus', 'Extensor digiti minimi', 'Extensor digitorum', 'Extensor indicis',
      'Extensor pollicis brevis', 'Extensor pollicis longus',
      'Flexor carpi radialis', 'Flexor digiti minimi brevis of hand', 'Flexor digitorum profundus', 'Flexor digitorum superficialis humeral head', 'Flexor pollicis longus',
      'Opponens digiti minimi muscle of hand', 'Opponens pollicis muscle',
      'Palmaris brevis muscle', 'Palmaris longus muscle', 'Pronator quadratus'
    ],
    tendons: [
      'Abductor pollicis longus tendon sheath', 'Common flexor tendon sheath',
      'Extensor carpi radialis brevis tendon sheath', 'Extensor carpi radialis longus tendon sheath',
      'Extensor carpi ulnaris tendon sheath', 'Extensor digiti minimi tendon sheath',
      'Extensor digitorum - Extensor indicis tendon sheath', 'Extensor pollicis brevis tendon sheath', 'Extensor pollicis longus tendon sheath',
      'Flexor carpi radialis tendon sheath', 'Flexor pollicis longus tendon sheath',
      'Common tendon of extensor carpi ulnaris', 'Common tendon of flexor carpi ulnaris',
      'Synovial sheaths of fingers'
    ],
    ligaments: [
      'Annular ligament(A1) of 1st finger', 'Annular ligament(A2) of 1st finger',
      'Annular ligaments of 2nd finger A1-A5', 'Annular ligaments of 3rd finger A1-A5', 'Annular ligaments of 4th finger A1-A5', 'Annular ligaments of 5th finger A1-A5',
      'Collateral ligaments of distal phalangeal joints', 'Collateral ligaments of interphalangeal joint', 'Collateral ligaments of metacarpal joints',
      'Cruciform ligaments of 2nd finger', 'Cruciform ligaments or 3rd finger', 'Cruciform ligaments or 4th finger', 'Cruciform ligaments or 5th finger',
      'Dorsal intercarpal ligaments', 'Dorsal radiocarpal ligament',
      'Oblique ligament of 1st finger',
      'Palmar ligaments of distal phalangeal joints', 'Palmar ligaments of interphalangeal joints', 'Palmar ligaments of metacarpophalangeal joints',
      'Palmar radiocarpal ligament', 'Palmar ulnocarpal ligament',
      'Pisometacarpal ligament', 'Radial collateral ligament', 'Ulnar collateral ligament',
      'Superficial transverse metacarpal ligament', 'Deep transverse metacarpal ligament', 'Transverse carpal ligament',
      'Capitohamate interosseus ligament', 'Scapholunate interosseus ligament', 'Lunotriquetral interosseous ligament'
    ],
    arteries: [
      'Anterior interosseous artery', 'Common palmar digital arteries', 'Deep palmar arch', 'Superficial palmar arch',
      'Dorsal carpal arch', 'Dorsal carpal network', 'Dorsal digital arteries of hand', 'Dorsal metacarpal artery',
      'Dorsalis indicis', 'Dorsalis pollicis',
      'Palmar carpal branches', 'Palmar metacarpal arteries', 'Perforating arteries of hand',
      'Posterior interosseous artery', 'Princeps pollicis artery', 'Proper palmar digital arteries',
      'Radial artery', 'Radialis indicis', 'Ulnar artery', 'Ulnar artery (dorsal carpal br)'
    ],
    veins: [
      'Anterior interosseous veins', 'Basilic vein', 'Cephalic vein', 'Deep veins of the arm',
      'Deep venous palmar arch', 'Dorsal digital veins', 'Dorsal metatarsal veins', 'Dorsal venous network of hand',
      'Intercapitular veins of hand', 'Median antebrachial vein',
      'Palmal digital veins', 'Palmar metacarpal veins', 'Palmar venous network of hand',
      'Posterior interosseous veins', 'Radial veins', 'Superficial palmar venous arch', 'Superficial veins of upper limb', 'Ulnar veins'
    ],
    nerves: [
      'Median nerve', 'Median nerve Common palmar digital nerve of the thumb', 'Median nerve Common palmar digital nerves',
      'Median nerve Palmar br', 'Median nerve Proper palmar digital nerves', 'Median nerve Proper palmar digital nerves of the thumb', 'Median nerve Recurrent br',
      'Radial nerve Dorsal digital nn', 'Radial nerve Superficial br',
      'Ulnar nerve', 'Ulnar nerve Communicating br', 'Ulnar nerve Deep br', 'Ulnar nerve Dorsal cutaneous br',
      'Ulnar nerve Palmar cutaneous br', 'Ulnar nerve Superficial br Common palmar digital n', 'Ulnar nerve Superficial br Proper palmar digital nn'
    ],
    fascia: [
      'Antebrachial fascia', 'Extensor retinaculum of wrist', 'Flexor retinaculum of wrist', 'Aponeurosis palmaris'
    ],
    cartilages: [
      'Articular cartiage of ulna distal end', 'Articular cartilage of capitate bone​', 'Articular cartilage of hamate bone​',
      'Articular cartilage of lunate bone', 'Articular cartilage of pisiform bone ​', 'Articular cartilage of radius distal end​',
      'Articular cartilage of scaphoid bone​', 'Articular cartilage of trapezium bone​', 'Articular cartilage of trapezoid bone​',
      'Articular cartilage of triquetrum bone', 'Articular cartilages of distal phalanges', 'Articular cartilages of metacarpal bones',
      'Articular cartilages of middle phalanges', 'Articular cartilages of proximal phalanges', 'Triangular fibro cartilage disc'
    ],
    jointCapsules: [
      'Articular capsule of radiocarpal joint', 'Articular capsules of distal interphalangeal joints',
      'Articular capsules of proximal interphalangeal joints', 'Articular capsules of metacarpophalangeal joints'
    ],
    extensors: [
      'Extensor hood of 2nd finger', 'Extensor hood of 3rd finger', 'Extensor hood of 4th finger', 'Extensor hood of 5th finger',
      'Lateral band of 2nd finger', 'Lateral band of 3rd finger', 'Lateral band of 4th finger', 'Lateral band of 5th finger',
      'Intertendinous connections of extensor digitorum'
    ],
    fibrousSheaths: [
      'Fibrous sheath of digits of hand', 'Fibrous sheath of digits of hand thumb'
    ]
  },

  // ============================================================================
  // LOWER LIMB MODEL TAGS (lower_limb_glb_tags.txt)
  // ============================================================================
  lowerLimb: {
    bones: [
      'Calcaneus.r', 'Coccyx', 'Cuboid bone.r', 'Femur.r', 'Fibula.r', 'Hip bone.r', 'Patella.r', 'Sacrum', 'Talus.r', 'Tibia.r',
      'Navicular bone.r', 'Intermediate cuneiform bone.r', 'Lateral cuneiform bone.r', 'Medial cuneiform bone.r',
      'First metatarsal bone.r', 'Second metatarsal bone.r', 'Third metatarsal bone.r', 'Fourth metatarsal bone.r', 'Fifth metatarsal bone.r',
      'Distal phalanx of first finger of foot.r', 'Distal phalanx of second finger of foot.r', 'Distal phalanx of third finger of foot.r', 'Distal phalanx of fourth finger of foot.r', 'Distal phalanx of fifth finger of foot.r',
      'Middle phalanx of second finger of foot.r', 'Middle phalanx of third finger of foot.r', 'Middle phalanx of fourth finger of foot.r', 'Middle phalanx of fifth finger of foot.r',
      'Proximal phalanx of first finger of foot.r', 'Proximal phalanx of second finger of foot.r', 'Proximal phalanx of third finger of foot.r', 'Proximal phalanx of fourth finger of foot.r', 'Proximal phalanx of fifth finger of foot.r',
      'Lumbar vertebra (L1)', 'Lumbar vertebra (L2)', 'Lumbar vertebra (L3)', 'Lumbar vertebra (L4)', 'Lumbar vertebra (L5)',
      'Thoracic vertebra (T12)', 'Sesamoid bones of foot.r'
    ],
    muscles: [
      // Hip muscles
      'Gluteus maximus muscle.r', 'Gluteus medius muscle.r', 'Gluteus minimus muscle.r',
      'Iliacus muscle.r', 'Psoas major.r', 'Psoas minor.r',
      'Piriformis muscle.r', 'Obturator externus.r', 'Obturator internus.r',
      'Superior gemellus muscle.r', 'Inferior gemellus muscle.r', 'Quadratus femoris muscle.r',
      // Thigh muscles - Anterior
      'Rectus femoris.r', 'Vastus lateralis muscle.r', 'Vastus medialis muscle.r', 'Vastus intermedius muscle.r',
      'Sartorius muscle.r', 'Tensor fasciae latae.r', 'Articularis genus.r',
      // Thigh muscles - Posterior (Hamstrings)
      'Long head of biceps femoris.r', 'Short head of biceps femoris.r', 'Common tendon of biceps femoris.r',
      'Semimembranosus muscle.r', 'Semimembranosus muscle tendon.r', 'Semitendinosus muscle.r',
      'Common tendon of Semitendinosus and Long head of biceps femoris',
      // Thigh muscles - Medial (Adductors)
      'Adductor longus.r', 'Adductor brevis.r', 'Adductor magnus.r', 'Gracilis muscle.r', 'Pectineus muscle.r',
      // Leg muscles - Anterior
      'Tibialis anterior muscle.r', 'Extensor digitorum longus.r', 'Extensor digitorum longus tendons.r',
      'Extensor hallucis longus.r', 'Fibularis tertius muscle.r',
      // Leg muscles - Lateral
      'Fibularis longus muscle.r', 'Fibularis brevis muscle.r',
      // Leg muscles - Posterior
      'Lateral head of gastrocnemius.r', 'Medial head of gastrocnemius.r', 'Soleus muscle.r',
      'Plantaris muscle.r', 'Popliteus muscle.r',
      'Tibialis posterior muscle.r', 'Flexor digitorum longus.r', 'Flexor hallucis longus.r',
      'Calcaneal tendon.r',
      // Foot muscles - Dorsal
      'Extensor digitorum brevis.r', 'Extensor hallucis brevis.r',
      // Foot muscles - Plantar
      'Abductor hallucis.r', 'Abductor digiti minimi of foot.r', 'Flexor digitorum brevis.r',
      'Quadratus plantae muscle.r', 'Lumbrical muscles of foot.r',
      'Flexor digiti minimi brevis of foot.r', 'Lateral head of flexor hallucis brevis.r', 'Medial head of flexor hallucis brevis.r',
      'Oblique head of adductor hallucis.r', 'Transverse head of adductor hallucis.r',
      '1st Dorsal interossei muscles of foot.r', '2nd Dorsal interossei muscles of foot.r', '3rd Dorsal interossei muscles of foot.r', '4th Dorsal interossei muscles of foot.r',
      'Plantar interossei muscles.r', 'Opponens digiti minimi muscle of foot.r',
      // Pelvic muscles
      'Coccygeus muscle.r', 'Plantar aponeurosis.r'
    ],
    ligaments: [
      // Hip ligaments
      'Hip joint capsule.r', 'Ligament of head of femur.r', 'Transverse acetabular ligament.r',
      'Iliolumbar ligament .r', 'Anterior sacro-iliac ligament.r', 'Interossea / Posterior sacro-iliac ligament.r',
      'Sacrospinous ligament.r', 'Sacrotuberal ligament.r',
      // Knee ligaments
      'Anterior cruciate ligament.r', 'Posterior cruciate ligament.r',
      'Fibular collateral ligament.r', 'Articular capsule of knee joint.r',
      'Transverse ligament of knee.r', 'Posterior meniscofemoral ligament.r',
      'Anterior horn of Lateral meniscus.r', 'Posterior horn of Lateral meniscus.r',
      'Anterior horn of Medial meniscus.r', 'Posterior horn of Medial meniscus.r',
      'Oblique popliteal ligament.r', 'Ligaments of fibular head.r',
      // Ankle ligaments
      'Anterior tibiofibular ligament.r', 'Posterior tibiofibular ligament.r', 'Transverse tibiofibular ligament.r',
      'Anterior talofibular ligament.r', 'Posterior talofibular ligament.r', 'Calcaneofibular ligament.r',
      'Anterior tibiotalar ligament (Tibiospring lig.).r', 'Posterior tibiotalar ligament.r',
      'Tibiocalcaneal ligament.r', 'Tibionavicular ligament.r',
      'Capsule of talocrural joint.r', 'Interosseous membrane of leg.r',
      // Foot ligaments
      'Anterior talocalcaneal ligament.r', 'Posterior talocalcaneal ligament.r', 'Medial talocalcaneal ligament.r',
      'Interosseus talocalcaneal ligament.r', 'Cervical ligament (anterior talocalcaneal ligament).r',
      'Talonavicular ligament.r', 'Bifurcatum ligament',
      'Plantar calcaneonavicular ligament.r', 'Long plantar ligament.r', 'Plantar calcaneocuboid ligament.r',
      'Dorsal calcaneocuboid ligament.r', 'Dorsal cuboidonavicular ligament.r',
      'Deep transverse metatarsal ligament.r', 'Superficial transverse metatarsal ligament.r',
      'Dorsal metatarsal ligaments.r', 'Plantar metatarsal ligaments.r', 'Dorsal tarsometatarsal ligaments.r', 'Plantar tarsometatarsal ligaments.r'
    ],
    arteries: [
      'Femoral artery.r', 'Deep artery of the thigh.r', 'Femoral neck vessels.r',
      'Lateral circumflex femoral artery.r', 'Medial circumflex femoral artery.r',
      'Ascending branch of lateral circumflex femoral artery.r', 'Descending branch of lateral circumflex femoral artery.r',
      '1th to 4th perforating branches of the deep femoral artery.r',
      'Popliteal artery.r', 'Superior lateral genicular artery.r', 'Superior medial genicular artery.r',
      'Inferior lateral genicular artery.r', 'Inferior medial genicular artery.r', 'Middle genicular artery.r',
      'Anterior tibial artery.r', 'Posterior tibial artery.r', 'Fibular artery.r',
      'Anterior tibial recurrent artery.r', 'Posterior tibial recurrent artery.r',
      'Dorsal pedis artery.r', 'Arcuate artery.r', 'Dorsal metatarsal arteries.r', 'Dorsal digital arteries of foot.r',
      'Lateral plantar artery.r', 'Medial plantar artery.r', 'Deep plantar arch.r', 'Plantar metatarsal arteries.r'
    ],
    veins: [
      'Femoral vein.r', 'Great saphenous vein.r', 'Small saphenous vein.r',
      'Deep femoral vein.r', 'Popliteal vein.r',
      'Anterior tibial vein.r', 'Posterior tibial vein.r', 'Fibular vein.r',
      'Dorsal venous arch of foot.r', 'Plantar venous arch.r',
      'Lateral marginal vein.r', 'Medial marginal vein.r'
    ],
    nerves: [
      'Femoral nerve.r', 'Saphenous branch of Femoralis nerve.r', 'Saphenous nerve (Medial crural cutaneous branches).r',
      'Schiatic nerve.r', 'Tibial nerve.r', 'Common fibular nerve.r',
      'Deep fibular nerve.r', 'Superficial fibular nerve.r',
      'Lateral plantar nerve.r', 'Medial plantar nerve.r',
      'Superior gluteal nerve.r', 'Inferior gluteal nerve.r',
      'Obturator nerve.r', 'Lateral femoral cuteneous nerve.r',
      'Posterior cutaneous nerve of the thigh.r'
    ],
    cartilages: [
      'Lateral meniscus.r', 'Medial meniscus.r', 'Acetabular labrum.r',
      'Art cart of femur head.r', 'Art cart of femur distal end.r',
      'Art cart of tibia proximal end.r', 'Art cart of tibia distal end.r',
      'Art cart of patella.r', 'Art cart of talus.r ​', 'Art cart of calcaneus.r',
      'Art carts of metatarsal bones.r', 'Art carts of proximal phalanges of foot.r', 'Art carts of middle phalanges of foot.r', 'Art carts of distal phalanges of foot.r'
    ],
    fascia: [
      'Fascia lata.r', 'Iliotibial tract.r', 'Crural fascia.r',
      'Anterior intermuscular septum of leg.r', 'Posterior intermuscular septum of leg.r', 'Transverse intermuscular septum of leg.r',
      'Lateral femoral intermuscular septum.r', 'Medial femoral intermuscular septum.r',
      'Gluteal aponeurosis.r',
      'Flexor retinaculum of ankle.r', 'Superior extensor retinaculum of ankle.r', 'Inferior extensor retinaculum.r',
      'Superior fibular retinaculum.r', 'Inferior fibular retinaculum.r'
    ],
    bursae: [
      'Bursa of piriformis.r', 'Deep Infrapatellar bursa.r', 'Subcutaneous Infrapatellar bursa.r',
      'Suprapatellar bursa overlay.r', 'Pes anserine bursa.r',
      'Subcutaneous trochanteric bursa.r', 'Trochanteric bursa of gluteus maximus.r', 'Trochanteric bursa of gluteus minimus.r',
      'Lateral subtendinous bursa of gastrocnemius muscle.r', 'Medial subtendinous bursa of gastrocnemius muscle.r',
      'Subtendinous calcaneal bursa.r', 'Subcutaneous calcaneal bursa.r'
    ],
    overlays: [
      'Quadriceps common tendon and patellar ligament.r', 'Pes anserinus common tendon.r',
      'Infrapatellar fat pad.r', 'Synovial membranes of knee.r',
      'Adductor canal.r', 'Adductor hiatus.r', 'Femoral triangle.r',
      'Extensor apparatus of 1st toe.r', 'Extensor apparatus of 2nd toe.r', 'Extensor apparatus of 3rd toe.r', 'Extensor apparatus of 4th toe.r', 'Extensor apparatus of 5th toe.r',
      'Fibrous sheath of toes.r'
    ]
  },

  // ============================================================================
  // UPPER LIMB MODEL TAGS (upper_limb_glb_tags.txt)
  // ============================================================================
  upperLimb: {
    // Back/Spine bones
    spinalBones: [
      'Lumbar vertebra (L1)', 'Lumbar vertebra (L2)', 'Lumbar vertebra (L3)', 'Lumbar vertebra (L4)', 'Lumbar vertebra (L5)',
      'Sacrum', 'Thoracic vertebra (T1)', 'Thoracic vertebra (T2)', 'Thoracic vertebra (T3)', 'Thoracic vertebra (T4)', 'Thoracic vertebra (T5)',
      'Thoracic vertebra (T6)', 'Thoracic vertebra (T7)', 'Thoracic vertebra (T8)', 'Thoracic vertebra (T9)', 'Thoracic vertebra (T10)', 'Thoracic vertebra (T11)', 'Thoracic vertebra (T12)',
      'Atlas (C1)', 'Axis (C2)', 'Cervical vertebra (C3)', 'Cervical vertebra (C4)', 'Cervical vertebra (C5)', 'Cervical vertebra (C6)', 'Cervical vertebra (C7)'
    ],
    armBones: [
      'Humerus.r', 'Radius.r', 'Ulna.r', 'Clavicle.r', 'Scapula.r.'
    ],
    handBones: [
      '1st metacarpal bone.r', '2nd metacarpal bone.r', '3rd metacarpal bone.r', '4th metacarpal bone.r', '5th metacarpal bone.r',
      'Capitate.r', 'Hamate.r', 'Lunate bone.r', 'Pisiform.r', 'Scaphoid.r', 'Trapezium.r', 'Trapezoid.r', 'Triquetrum.r',
      'Distal phalanx of 1st finger.r', 'Distal phalanx of 2d finger.r', 'Distal phalanx of 3d finger.r', 'Distal phalanx of 4th finger.r', 'Distal phalanx of 5th finger.r',
      'Middle phalanx of 2d finger.r', 'Middle phalanx of 3rd finger.r', 'Middle phalanx of 4th finger.r', 'Middle phalanx of 5th finger.r',
      'Proximal phalanx of 1st finger.r', 'Proximal phalanx of 2d finger.r', 'Proximal phalanx of 3rd finger.r', 'Proximal phalanx of 4th finger.r', 'Proximal phalanx of 5th finger.r',
      'Sesamoid bones of hand.r'
    ],
    thoraxBones: [
      'Body of sternum', 'Manubrium of sternum', 'Xiphoid process',
      'Rib (1st).r', 'Rib (2nd).r', 'Rib (3rd).r', 'Rib (4th).r', 'Rib (5th).r', 'Rib (6th).r',
      'Rib (7th).r', 'Rib (8th).r', 'Rib (9th).r', 'Rib (10th).r', 'Rib (11th).r', 'Rib (12th).r'
    ],
    armMuscles: [
      'Long head of biceps brachii.r', 'Short head of biceps brachii.r', 'Common tendon of biceps brachii.r', 'Bicipital aponeurosis.r',
      'Brachialis muscle.r', 'Coracobrachialis muscle.r',
      'Long head of triceps brachii.r', 'Lateral head of triceps brachii.r', 'Medial head of triceps brachii.r', 'Common tendon of triceps brachii.r',
      'Long head of biceps brachii tendon sheath.r'
    ],
    forearmMuscles: [
      'Abductor pollicis longus.r', 'Anconeus muscle.r', 'Brachioradialis muscle.r',
      'Common tendon of extensor carpi ulnaris.r', 'Common tendon of flexor carpi ulnaris.r',
      'Extensor carpi radialis brevis.r', 'Extensor carpi radialis longus.r',
      'Extensor digiti minimi.r', 'Extensor digitorum.r', 'Extensor indicis.r',
      'Extensor pollicis brevis.r', 'Extensor pollicis longus.r',
      'Flexor carpi radialis.r', 'Flexor digitorum profundus.r',
      'Flexor digitorum superficialis humero-ulnar head.r', 'Flexor digitorum superficialis radial head.r',
      'Flexor pollicis longus.r',
      'Humeral head of extensor carpi ulnaris.r', 'Ulnar head of extensor carpi ulnaris.r',
      'Humeral head of flexor carpi ulnaris.r', 'Ulnar head of flexor carpi ulnaris.r',
      'Humeral head of pronator teres.r', 'Ulnar head of pronator teres.r',
      'Palmaris longus muscle.r', 'Pronator quadratus.r', 'Supinator.r'
    ],
    handMuscles: [
      '1st dorsal interosseus of hand.r', '2nd dorsal interosseus of hand.r', '3rd dorsal interosseus of hand.r', '4th dorsal interosseus of hand.r',
      '1st lumbrical of hand.r', '2nd lumbrical of hand.r', '3rd lumbrical of hand.r', '4th lumbrical of hand.r',
      '1st palmar interosseus of hand.r', '2nd palmar interosseus of hand.r', '3rd palmar interosseus of hand.r',
      'Abductor digiti minimi.r', 'Abductor pollicis brevis.r', 'Adductor pollicis.r',
      'Deep head of flexor pollicis brevis.r', 'Superficial head of flexor pollicis brevis.r',
      'Extensor hood of 2nd finger.r', 'Extensor hood of 3rd finger.r', 'Extensor hood of 4th finger.r', 'Extensor hood of 5th finger.r',
      'Flexor digiti minimi brevis of hand.r',
      'Oblique head of adductor pollicis.r', 'Transverse head of adductor pollicis.r',
      'Opponens digiti minimi muscle of hand.r', 'Opponens pollicis muscle.r',
      'Palmaris brevis muscle.r', 'Aponeurosis palmaris.r', 'Superficial transverse metacarpal lig.'
    ],
    shoulderMuscles: [
      'Deltoid muscle.r', 'Acromial part of deltoid muscle.r', 'Clavicular part of deltoid muscle.r', 'Spinal part of deltoid muscle.r',
      'Supraspinatus muscle.r', 'Infraspinatus muscle.r', 'Teres minor muscle.r', 'Subscapularis muscle.r',
      'Teres major muscle.r', 'Latissimus dorsi.r',
      'Pectoralis major.r', 'Abdominal head of pectoralis major muscle.r', 'Clavicular head of pectoralis major muscle.r', 'Sternocostal head of pectoralis major muscle.r',
      'Pectoralis minor muscle.r', 'Subclavius muscle.r', 'Serratus anterior muscle.r',
      'Trapezius muscle.r', 'Ascending part of Trapezius muscle.r', 'Descending part of Trapezius muscle.r', 'Transverse part of trapezius muscle.r',
      'Rhomboid major muscle.r', 'Rhomboid minor muscle.r', 'Levator scapulae.r'
    ],
    armNerves: [
      'Axillary nerve - superior lateral br cutaneous nerve.r',
      'Lateral root of median nerve.r', 'Medial root of median nerve.r', 'Median nerve.r',
      'Medial brachial cutaneous nerve.r', 'Medial antebrachial cutaneous nerve.r',
      'Musculocutaneus nerve.r', 'Musculocutaneus nerve  - lateral antebrachial cutaneous nerve.r',
      'Radial nerve.r', 'Radial nerve (deep branch).r', 'Radial nerve (superficial br).r',
      'Radial nerve (inferior lateral brachial cutaneous n).r', 'Radial nerve (posterior antebrachial cutaneous n).r', 'Radial nerve (posterior brachial cutaneous n).r', 'Radial nerve (posterior interosseus n).r',
      'Ulnar nerve.r'
    ],
    handNerves: [
      'Median nerve Common palmar digital nerve of the thumb', 'Median nerve Common palmar digital nerves',
      'Median nerve Palmar br', 'Median nerve Proper palmar digital nerves', 'Median nerve Proper palmar digital nerves of the thumb', 'Median nerve Recurrent br',
      'Radial nerve (dorsal digital nn).r',
      'Ulnar nerve Communicating br', 'Ulnar nerve Deep br', 'Ulnar nerve Dorsal cutaneous br', 'Ulnar nerve Palmar cutaneous br',
      'Ulnar nerve Superficial br Common palmar digital n', 'Ulnar nerve Superficial br Proper palmar digital nn'
    ],
    brachialPlexus: [
      'C5 root.r', 'C6 root.r', 'C7 root.r', 'C8 root.r', 'T1 root.r',
      'Superior trunk of brachial plexus.r', 'Middle trunk of brachial plexus.r', 'Inferior trunk of brachial plexus.r',
      'Anterior divisions of brachial plexus.r', 'Posterior divisions of brachial plexus.r',
      'Lateral cord of brachial plexus.r', 'Medial cord of brachial plexus.r', 'Posterior cord of brachial plexus.r',
      'Lateral pectoral nerve.r', 'Medial pectoral nerve.r', 'Long thoracic nerve.r', 'Subclavian nerve.r',
      'Dorsal scapular nerve.r', 'Lower subscapular nerve.r', 'Upper subscapular nerve.r', 'Suprascapular nerve.r'
    ],
    arteries: [
      'Axillary artery.r', 'Brachial artery.r', 'Brachiocephalic artery.r',
      'Anterior circumflex humeral artery.r', 'Posterior circumflex humeral artery.r',
      'Deep artery of arm.r', 'Middle collateral artery.r', 'Radial collateral artery.r', 'Medial collateral artery.r',
      'Superior ulnar collateral artery.r', 'Inferior ulnar collateral artery.r',
      'Radial artery.r', 'Ulnar artery.r', 'Common interosseous artery.r',
      'Anterior interosseous artery.r', 'Posterior interosseous artery.r', 'Interosseous recurrent artery.r',
      'Radial recrurrent artery.r', 'Anterior ulnar recurrent artery.r', 'Posterior ulnar recurrent artery.r',
      'Superficial palmar arch.r', 'Deep palmar arch.r', 'Common palmar digital arteries.r', 'Proper palmar digital arteries.r',
      'Dorsal carpal arch.r', 'Dorsal carpal network.r', 'Dorsal digital arteries.r', 'Dorsal metacarpal arteries.r',
      'Palmar carpal branches.r', 'Palmar metacarpal arteries.r', 'Princeps pollicis arteries.r', 'Radialis indicis.r', 'Dorsalis indicis.r', 'Dorsalis pollicis.r'
    ],
    veins: [
      'Axillary vein.r', 'Subclavian vein.r',
      'Arm superficial vein-Basilic vein.r', 'Arm superficial vein-Cephalic vein.r',
      'Arm superficial vein-Median antebrachial vein.r', 'Arm superficial vein-Median cubital vein.r',
      'Deep veins of the arm.r', 'Superficial veins of upper limb.r',
      'Anterior interosseous veins.r', 'Posterior interosseous veins.r', 'Radial veins.r', 'Ulnar veins.r',
      'Deep venous palmar arch', 'Superficial palmar venous arch', 'Dorsal venous network', 'Palmar venous network'
    ],
    ligaments: [
      // Shoulder ligaments
      'Articular capsule of glenohumeral joint.r', 'Glenoid labrum.r',
      'Superior glenohumeral ligament.r', 'Middle glenohumeral ligament.r', 'Inferior glenohumeral ligament.r',
      'Coracohumeral ligament.r', 'Transverse humeral ligament.r',
      'Acromioclavicular ligament.r', 'Acromioclavicular capsule.r', 'Acromioclavicular disc.r',
      'Coracoclavicular ligament.r', 'Conoid ligament (part of coracoclavicular ligament).r', 'Trapezoid ligament (part of coracoclavicular ligament).r',
      'Coraco-acromial ligament.r', 'Superior transverse scapular ligament.r', 'Inferior transverse scapular ligament.r',
      // Sternoclavicular ligaments
      'Anterior sternoclavicular ligament.r', 'Posterior Sternoclavicular ligament.r',
      'Sternoclavicular capsule.r', 'Interclavicular ligament.r', 'Costoclavicular ligament.r',
      // Elbow ligaments
      'Articular capsule of elbow joint.r', 'Radial annular ligament.r',
      'Radial collateral ligament of elbow.r', 'Ulnar collateral ligament of elbow.r', 'Quadrate ligament.r',
      // Forearm ligaments
      'Interosseous membrane of forearm.r', 'Oblique cord or radio-ulnar syndesmosis.r', 'Dorsal radio-ulnar ligament.r',
      // Wrist/Hand ligaments
      'Articular capsule of radiocarpal joint', 'Dorsal radiocarpal ligament.r', 'Palmar radiocarpal ligament.r', 'Palmar ulnocarpal ligament.r',
      'Radial collateral ligament of wrist.r', 'Ulnar collateral ligament of wrist.r',
      'Extensor retinaculum of wrist', 'Flexor retinaculum', 'Thickened part of antebrachial fascia'
    ],
    fascia: [
      'Brachial fascia.r', 'Antebrachial fascia.r',
      'Lateral intermuscular septum of arm.r', 'Medial intermuscular septum of arm.r'
    ],
    bursae: [
      'Subacromial bursa.r', 'Subdeltoid bursa.r', 'Subacromial-subdeltoid bursa.r', 'Subcutaneous acromial bursa.r',
      'Coracobrachial bursa.r', 'Subtendinous bursa of subscapularis.r', 'Subtendinous bursa of infraspinatus muscle.r',
      'Subtendinous bursa of latissimus dorsi.r', 'Subtendinous bursa of teres major.r', 'Subtendinous bursa of trapezius.r',
      'Infraserratus bursa.r', 'Supraserratus bursa.r',
      'Subcutaneous olecranon bursa.r', 'Intratendinous olecranon bursa.r', 'Subtendinous bursa of triceps brachii.r',
      'Bicipitoradial bursa', 'Interosseous cubital bursa.r'
    ],
    cartilages: [
      'Art cart of humerus head​.r', 'Art cart of humerus distal end.r​',
      'Art cart of radius head​.r', 'Art cart of radius distal end​.r',
      'Art cart of ulna (proximal end).r', 'Art cart of ulna. (distal end).r',
      'Articular cartilage of glenohumeral joint on scapula.r',
      'Articular cartilage of acromioclavicular joint on clavicle.r', 'Articular cartilage of acromioclavicular joint on scapula.r',
      'Articular cartilage of sternoclavicular joint on clavicle.r', 'Articular disc of steroclavicular joint.r',
      'Art cart of capitate bone​', 'Art cart of hamate bone​', 'Art cart of lunate bone', 'Art cart of pisiform bone ​',
      'Art cart of scaphoid bone​', 'Art cart of trapezium bone​', 'Art cart of trapezoid bone​', 'Art cart of triquetrum bone',
      'Art carts of metacarpal bones', 'Art carts of proximal phalanges', 'Art carts of middle phalanges', 'Art carts of distal phalanges',
      'Triangular fibro cartilage disc'
    ],
    intervertebralDiscs: [
      'Annulus fibrosus T1 T2', 'Annulus fibrosus T2 T3', 'Annulus fibrosus T3 T4', 'Annulus fibrosus T4 T5',
      'Annulus fibrosus T5 T6', 'Annulus fibrosus T6 T7', 'Annulus fibrosus T7 T8', 'Annulus fibrosus T8 T9',
      'Annulus fibrosus T9 T10', 'Annulus fibrosus T10 T11', 'Annulus fibrosus T11 T12', 'Annulus fibrosus T12 L1',
      'Annulus fibrosus L1 L20', 'Annulus fibrosus L2 L3', 'Annulus fibrosus L3 L4', 'Annulus fibrosus L4 L5', 'Annulus fibrosus L5 S1',
      'annulus fibrosus C2 C3', 'annulus fibrosus C3 C4', 'annulus fibrosus C4 C5', 'annulus fibrosus C5 C6', 'annulus fibrosus C6 C7', 'annulus fibrosus C7 T1',
      'Nucleus pulposus C2-T1', 'Nucleus pulposus L1-S1', 'Nucleus pulposus T1-L1'
    ]
  }
};

// ============================================================================
// MATERIAL TAGS - For texture/appearance control
// ============================================================================

export const MATERIAL_TAGS = {
  bones: [
    'Bone', 'radius.001', 'ulna.001', 'humerus.001', 'femur', 'Tibia', 'Fibula', 'Patella',
    'Hip bone', 'sacrum', 'Coccyx', 'calcaneus', 'Talus', 'Scapula.001', 'clavicle.001'
  ],
  muscles: [
    'Muscle basic', 'Muscle texture basic', 'Muscle tile plain', 'Muscle tile plain.001', 'Muscle long tendons', 'Muscle long tendons.001'
  ],
  tendons: ['Tendon only', 'tendon'],
  cartilages: ['Articular cartilage', 'Disc', 'Disc.001'],
  ligaments: ['overlay.001', 'Overlays', 'Overlays.001'],
  fascia: ['fascia_material', 'fascia_mat', 'Fascia'],
  retinaculum: ['retinaculum_wrist', 'Retinaculum'],
  sheaths: ['sheathmat', 'sheath'],
  vessels: ['Artery', 'Vein'],
  nerves: ['Nerves'],
  bursae: ['Bursae'],
  jointCapsules: ['radiocarpaljoint', 'glenhumjoint', 'Articular capsule of elbow joint', 'Articular capsule of knee joint', 'Hip joint capsule', 'Capsule of talocrural joint'],
  extensors: ['Extensor hoods', 'Extensor hoods.001', 'Extensor hoods toe'],
  fibrousSheaths: ['fibroussheathhand', 'Fibrous sheath of toes'],
  fat: ['Fat']
};

// ============================================================================
// ANATOMY LAYER SYSTEM - For educational visibility toggling
// ============================================================================

export type AnatomyLayer = 
  | 'bones' 
  | 'muscles' 
  | 'tendons' 
  | 'ligaments' 
  | 'arteries' 
  | 'veins' 
  | 'nerves' 
  | 'fascia' 
  | 'cartilages' 
  | 'jointCapsules' 
  | 'bursae' 
  | 'overlays';

export interface LayerConfig {
  id: AnatomyLayer;
  name: string;
  description: string;
  color: string; // For UI
  defaultVisible: boolean;
  educationalNote: string;
}

export const ANATOMY_LAYERS: LayerConfig[] = [
  { id: 'bones', name: 'Bones', description: 'Skeletal structure', color: '#e8dcc4', defaultVisible: true, educationalNote: 'The rigid framework providing support and attachment points for muscles.' },
  { id: 'muscles', name: 'Muscles', description: 'Skeletal muscles', color: '#c74b50', defaultVisible: true, educationalNote: 'Contractile tissue that produces movement by pulling on bones.' },
  { id: 'tendons', name: 'Tendons', description: 'Muscle-to-bone connections', color: '#f5f5f5', defaultVisible: true, educationalNote: 'Dense connective tissue connecting muscles to bones, transmitting force.' },
  { id: 'ligaments', name: 'Ligaments', description: 'Bone-to-bone connections', color: '#90caf9', defaultVisible: false, educationalNote: 'Strong bands connecting bones across joints, providing stability.' },
  { id: 'arteries', name: 'Arteries', description: 'Blood supply (oxygenated)', color: '#e53935', defaultVisible: false, educationalNote: 'Vessels carrying oxygenated blood from the heart to tissues.' },
  { id: 'veins', name: 'Veins', description: 'Blood return (deoxygenated)', color: '#1565c0', defaultVisible: false, educationalNote: 'Vessels returning deoxygenated blood to the heart.' },
  { id: 'nerves', name: 'Nerves', description: 'Neural pathways', color: '#ffc107', defaultVisible: false, educationalNote: 'Bundles of axons transmitting signals between the CNS and periphery.' },
  { id: 'fascia', name: 'Fascia', description: 'Connective tissue layers', color: '#b39ddb', defaultVisible: false, educationalNote: 'Sheets of connective tissue that separate and compartmentalize structures.' },
  { id: 'cartilages', name: 'Cartilage', description: 'Articular surfaces', color: '#4dd0e1', defaultVisible: false, educationalNote: 'Smooth tissue covering joint surfaces, reducing friction.' },
  { id: 'jointCapsules', name: 'Joint Capsules', description: 'Synovial enclosures', color: '#81c784', defaultVisible: false, educationalNote: 'Fibrous enclosures surrounding synovial joints.' },
  { id: 'bursae', name: 'Bursae', description: 'Fluid-filled sacs', color: '#ffcc80', defaultVisible: false, educationalNote: 'Sacs of synovial fluid reducing friction between tissues.' },
  { id: 'overlays', name: 'Overlays', description: 'Special structures', color: '#ce93d8', defaultVisible: false, educationalNote: 'Additional anatomical structures for detailed study.' }
];

// ============================================================================
// JOINT DEFINITIONS
// ============================================================================

export interface JointSpec {
  id: string;
  name: string;
  axis: Vector3; // Local axis of rotation (no longer used for rendering)
  minDeg: number;
  maxDeg: number;
  neutralDeg: number; // Resting anatomical position
  region: 'upper' | 'lower' | 'axial' | 'hand' | 'foot';
  // Associated anatomical tags for educational content
  primaryBones: string[];  // Bones that move
  secondaryBones: string[]; // Bones that move slightly
  musclesToHighlight: string[]; // Muscles involved (for educational highlighting)
  ligamentsToShow: string[]; // Ligaments to show during this motion
}

export const JOINTS: Record<string, JointSpec> = {
  // ============================================================================
  // SHOULDER COMPLEX - With full 3D model tag integration
  // ============================================================================
  shoulderFlexExt: {
    id: 'shoulderFlexExt',
    name: 'Shoulder Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: -60,
    maxDeg: 180,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Humerus.r'],
    secondaryBones: ['Scapula.r.', 'Clavicle.r'],
    musclesToHighlight: [
      'Deltoid muscle.r', 'Clavicular part of deltoid muscle.r', 'Acromial part of deltoid muscle.r',
      'Pectoralis major.r', 'Clavicular head of pectoralis major muscle.r',
      'Long head of biceps brachii.r', 'Short head of biceps brachii.r',
      'Coracobrachialis muscle.r', 'Latissimus dorsi.r', 'Teres major muscle.r',
      'Long head of triceps brachii.r'
    ],
    ligamentsToShow: [
      'Articular capsule of glenohumeral joint.r', 'Coracohumeral ligament.r',
      'Superior glenohumeral ligament.r', 'Middle glenohumeral ligament.r', 'Inferior glenohumeral ligament.r'
    ]
  },
  shoulderAbdAdd: {
    id: 'shoulderAbdAdd',
    name: 'Shoulder Abduction/Adduction',
    axis: vec3(0, 0, 1),
    minDeg: -30,
    maxDeg: 180,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Humerus.r'],
    secondaryBones: ['Scapula.r.', 'Clavicle.r'],
    musclesToHighlight: [
      'Deltoid muscle.r', 'Acromial part of deltoid muscle.r', 'Spinal part of deltoid muscle.r',
      'Supraspinatus muscle.r', 'Pectoralis major.r', 'Latissimus dorsi.r',
      'Teres major muscle.r', 'Long head of triceps brachii.r', 'Coracobrachialis muscle.r'
    ],
    ligamentsToShow: [
      'Articular capsule of glenohumeral joint.r', 'Coracohumeral ligament.r',
      'Inferior glenohumeral ligament.r', 'Glenoid labrum.r'
    ]
  },
  shoulderRotation: {
    id: 'shoulderRotation',
    name: 'Shoulder Medial/Lateral Rotation',
    axis: vec3(0, 1, 0),
    minDeg: -90,
    maxDeg: 90,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Humerus.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Lateral rotators
      'Infraspinatus muscle.r', 'Teres minor muscle.r', 'Spinal part of deltoid muscle.r',
      // Medial rotators
      'Subscapularis muscle.r', 'Pectoralis major.r', 'Latissimus dorsi.r',
      'Teres major muscle.r', 'Clavicular part of deltoid muscle.r'
    ],
    ligamentsToShow: [
      'Articular capsule of glenohumeral joint.r', 'Transverse humeral ligament.r'
    ]
  },
  shoulderHorizAbdAdd: {
    id: 'shoulderHorizAbdAdd',
    name: 'Shoulder Horizontal Abd/Add',
    axis: vec3(0, 1, 0),
    minDeg: -30,
    maxDeg: 135,
    neutralDeg: 90,
    region: 'upper',
    primaryBones: ['Humerus.r'],
    secondaryBones: ['Scapula.r.'],
    musclesToHighlight: [
      'Pectoralis major.r', 'Sternocostal head of pectoralis major muscle.r',
      'Clavicular head of pectoralis major muscle.r', 'Spinal part of deltoid muscle.r',
      'Infraspinatus muscle.r', 'Teres minor muscle.r', 'Latissimus dorsi.r'
    ],
    ligamentsToShow: ['Articular capsule of glenohumeral joint.r']
  },

  // ============================================================================
  // ELBOW - With full 3D model tag integration
  // ============================================================================
  elbowFlexExt: {
    id: 'elbowFlexExt',
    name: 'Elbow Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: 0,
    maxDeg: 150,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Radius.r', 'Ulna.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Flexors
      'Long head of biceps brachii.r', 'Short head of biceps brachii.r', 'Common tendon of biceps brachii.r',
      'Brachialis muscle.r', 'Brachioradialis muscle.r',
      // Extensors
      'Long head of triceps brachii.r', 'Lateral head of triceps brachii.r', 'Medial head of triceps brachii.r',
      'Common tendon of triceps brachii.r', 'Anconeus muscle.r'
    ],
    ligamentsToShow: [
      'Articular capsule of elbow joint.r', 'Radial collateral ligament of elbow.r',
      'Ulnar collateral ligament of elbow.r', 'Radial annular ligament.r'
    ]
  },

  // ============================================================================
  // FOREARM - With full 3D model tag integration
  // ============================================================================
  forearmProSup: {
    id: 'forearmProSup',
    name: 'Forearm Pronation/Supination',
    axis: vec3(0, 1, 0),
    minDeg: -90,
    maxDeg: 90,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Radius.r'],
    secondaryBones: ['Ulna.r'],
    musclesToHighlight: [
      // Pronators
      'Humeral head of pronator teres.r', 'Ulnar head of pronator teres.r', 'Pronator quadratus.r',
      // Supinators
      'Supinator.r', 'Long head of biceps brachii.r', 'Short head of biceps brachii.r'
    ],
    ligamentsToShow: [
      'Interosseous membrane of forearm.r', 'Radial annular ligament.r',
      'Oblique cord or radio-ulnar syndesmosis.r', 'Quadrate ligament.r'
    ]
  },

  // ============================================================================
  // WRIST - With full 3D model tag integration
  // ============================================================================
  wristFlexExt: {
    id: 'wristFlexExt',
    name: 'Wrist Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: -80,
    maxDeg: 70,
    neutralDeg: 0,
    region: 'hand',
    primaryBones: [
      'Capitate.r', 'Hamate.r', 'Lunate bone.r', 'Scaphoid.r', 'Trapezium.r', 'Trapezoid.r', 'Triquetrum.r', 'Pisiform.r',
      '1st metacarpal bone.r', '2nd metacarpal bone.r', '3rd metacarpal bone.r', '4th metacarpal bone.r', '5th metacarpal bone.r'
    ],
    secondaryBones: [],
    musclesToHighlight: [
      // Flexors
      'Flexor carpi radialis.r', 'Flexor carpi ulnaris', 'Common tendon of flexor carpi ulnaris.r',
      'Palmaris longus muscle.r', 'Flexor digitorum superficialis humero-ulnar head.r',
      'Flexor digitorum profundus.r',
      // Extensors
      'Extensor carpi radialis longus.r', 'Extensor carpi radialis brevis.r',
      'Common tendon of extensor carpi ulnaris.r', 'Extensor digitorum.r'
    ],
    ligamentsToShow: [
      'Articular capsule of radiocarpal joint', 'Dorsal radiocarpal ligament.r', 'Palmar radiocarpal ligament.r',
      'Flexor retinaculum', 'Extensor retinaculum of wrist'
    ]
  },
  wristDeviation: {
    id: 'wristDeviation',
    name: 'Wrist Radial/Ulnar Deviation',
    axis: vec3(0, 0, 1),
    minDeg: -30,
    maxDeg: 20,
    neutralDeg: 0,
    region: 'hand',
    primaryBones: [
      'Scaphoid.r', 'Lunate bone.r', 'Triquetrum.r', 'Capitate.r'
    ],
    secondaryBones: [
      '1st metacarpal bone.r', '2nd metacarpal bone.r', '3rd metacarpal bone.r', '4th metacarpal bone.r', '5th metacarpal bone.r'
    ],
    musclesToHighlight: [
      // Radial deviation
      'Flexor carpi radialis.r', 'Extensor carpi radialis longus.r', 'Extensor carpi radialis brevis.r',
      'Abductor pollicis longus.r',
      // Ulnar deviation
      'Flexor carpi ulnaris', 'Common tendon of flexor carpi ulnaris.r',
      'Common tendon of extensor carpi ulnaris.r'
    ],
    ligamentsToShow: [
      'Radial collateral ligament of wrist.r', 'Ulnar collateral ligament of wrist.r',
      'Palmar ulnocarpal ligament.r'
    ]
  },

  // ============================================================================
  // HIP - With full 3D model tag integration
  // ============================================================================
  hipFlexExt: {
    id: 'hipFlexExt',
    name: 'Hip Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: -30,
    maxDeg: 125,
    neutralDeg: 0,
    region: 'lower',
    primaryBones: ['Femur.r'],
    secondaryBones: ['Hip bone.r'],
    musclesToHighlight: [
      // Flexors
      'Iliacus muscle.r', 'Psoas major.r', 'Rectus femoris.r', 'Sartorius muscle.r',
      'Tensor fasciae latae.r', 'Pectineus muscle.r', 'Adductor longus.r',
      // Extensors
      'Gluteus maximus muscle.r', 'Long head of biceps femoris.r',
      'Semimembranosus muscle.r', 'Semitendinosus muscle.r', 'Adductor magnus.r'
    ],
    ligamentsToShow: [
      'Hip joint capsule.r', 'Ligament of head of femur.r',
      'Iliolumbar ligament .r'
    ]
  },
  hipAbdAdd: {
    id: 'hipAbdAdd',
    name: 'Hip Abduction/Adduction',
    axis: vec3(0, 0, 1),
    minDeg: -30,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'lower',
    primaryBones: ['Femur.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Abductors
      'Gluteus medius muscle.r', 'Gluteus minimus muscle.r', 'Tensor fasciae latae.r',
      'Piriformis muscle.r', 'Sartorius muscle.r',
      // Adductors
      'Adductor longus.r', 'Adductor brevis.r', 'Adductor magnus.r',
      'Gracilis muscle.r', 'Pectineus muscle.r'
    ],
    ligamentsToShow: [
      'Hip joint capsule.r', 'Ligament of head of femur.r'
    ]
  },
  hipRotation: {
    id: 'hipRotation',
    name: 'Hip Medial/Lateral Rotation',
    axis: vec3(0, 1, 0),
    minDeg: -45,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'lower',
    primaryBones: ['Femur.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Lateral rotators (deep 6)
      'Piriformis muscle.r', 'Obturator externus.r', 'Obturator internus.r',
      'Superior gemellus muscle.r', 'Inferior gemellus muscle.r', 'Quadratus femoris muscle.r',
      'Gluteus maximus muscle.r', 'Sartorius muscle.r',
      // Medial rotators
      'Gluteus medius muscle.r', 'Gluteus minimus muscle.r', 'Tensor fasciae latae.r',
      'Adductor longus.r', 'Adductor brevis.r', 'Adductor magnus.r'
    ],
    ligamentsToShow: [
      'Hip joint capsule.r', 'Sacrospinous ligament.r', 'Sacrotuberal ligament.r'
    ]
  },

  // ============================================================================
  // KNEE - With full 3D model tag integration
  // ============================================================================
  kneeFlexExt: {
    id: 'kneeFlexExt',
    name: 'Knee Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: 0,
    maxDeg: 140,
    neutralDeg: 0,
    region: 'lower',
    primaryBones: ['Tibia.r', 'Fibula.r', 'Patella.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Extensors (quadriceps)
      'Rectus femoris.r', 'Vastus lateralis muscle.r', 'Vastus medialis muscle.r', 'Vastus intermedius muscle.r',
      'Quadriceps common tendon and patellar ligament.r', 'Articularis genus.r',
      // Flexors (hamstrings + others)
      'Long head of biceps femoris.r', 'Short head of biceps femoris.r',
      'Semimembranosus muscle.r', 'Semitendinosus muscle.r',
      'Sartorius muscle.r', 'Gracilis muscle.r', 'Popliteus muscle.r',
      'Lateral head of gastrocnemius.r', 'Medial head of gastrocnemius.r', 'Plantaris muscle.r'
    ],
    ligamentsToShow: [
      'Articular capsule of knee joint.r', 'Anterior cruciate ligament.r', 'Posterior cruciate ligament.r',
      'Fibular collateral ligament.r', 'Transverse ligament of knee.r',
      'Lateral meniscus.r', 'Medial meniscus.r'
    ]
  },

  // ============================================================================
  // ANKLE - With full 3D model tag integration
  // ============================================================================
  ankleFlexExt: {
    id: 'ankleFlexExt',
    name: 'Ankle Dorsiflexion/Plantarflexion',
    axis: vec3(1, 0, 0),
    minDeg: -50,
    maxDeg: 20,
    neutralDeg: 0,
    region: 'foot',
    primaryBones: ['Talus.r', 'Calcaneus.r', 'Navicular bone.r'],
    secondaryBones: [
      'First metatarsal bone.r', 'Second metatarsal bone.r', 'Third metatarsal bone.r',
      'Fourth metatarsal bone.r', 'Fifth metatarsal bone.r'
    ],
    musclesToHighlight: [
      // Dorsiflexors
      'Tibialis anterior muscle.r', 'Extensor digitorum longus.r', 'Extensor hallucis longus.r',
      'Fibularis tertius muscle.r',
      // Plantarflexors
      'Lateral head of gastrocnemius.r', 'Medial head of gastrocnemius.r', 'Soleus muscle.r',
      'Calcaneal tendon.r', 'Plantaris muscle.r',
      'Tibialis posterior muscle.r', 'Flexor digitorum longus.r', 'Flexor hallucis longus.r',
      'Fibularis longus muscle.r', 'Fibularis brevis muscle.r'
    ],
    ligamentsToShow: [
      'Capsule of talocrural joint.r', 'Anterior tibiofibular ligament.r', 'Posterior tibiofibular ligament.r',
      'Anterior talofibular ligament.r', 'Calcaneofibular ligament.r'
    ]
  },
  ankleInvEv: {
    id: 'ankleInvEv',
    name: 'Ankle Inversion/Eversion',
    axis: vec3(0, 0, 1),
    minDeg: -35,
    maxDeg: 15,
    neutralDeg: 0,
    region: 'foot',
    primaryBones: ['Talus.r', 'Calcaneus.r', 'Navicular bone.r', 'Cuboid bone.r'],
    secondaryBones: [
      'Medial cuneiform bone.r', 'Intermediate cuneiform bone.r', 'Lateral cuneiform bone.r'
    ],
    musclesToHighlight: [
      // Invertors
      'Tibialis anterior muscle.r', 'Tibialis posterior muscle.r',
      'Flexor hallucis longus.r', 'Flexor digitorum longus.r',
      // Evertors
      'Fibularis longus muscle.r', 'Fibularis brevis muscle.r', 'Fibularis tertius muscle.r',
      'Extensor digitorum longus.r'
    ],
    ligamentsToShow: [
      'Anterior talofibular ligament.r', 'Posterior talofibular ligament.r', 'Calcaneofibular ligament.r',
      'Anterior tibiotalar ligament (Tibiospring lig.).r', 'Tibiocalcaneal ligament.r',
      'Anterior talocalcaneal ligament.r', 'Interosseus talocalcaneal ligament.r'
    ]
  },

  // ============================================================================
  // SPINE/TRUNK - With full 3D model tag integration
  // ============================================================================
  spineFlexExt: {
    id: 'spineFlexExt',
    name: 'Spine Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: -30,
    maxDeg: 85,
    neutralDeg: 0,
    region: 'axial',
    primaryBones: [
      'Lumbar vertebra (L1)', 'Lumbar vertebra (L2)', 'Lumbar vertebra (L3)', 'Lumbar vertebra (L4)', 'Lumbar vertebra (L5)',
      'Thoracic vertebra (T10)', 'Thoracic vertebra (T11)', 'Thoracic vertebra (T12)'
    ],
    secondaryBones: ['Sacrum'],
    musclesToHighlight: [
      // Flexors - would be abdominals (not in these models)
      'Psoas major.r', 'Iliacus muscle.r',
      // Extensors - erector spinae group (represented in lower limb model)
    ],
    ligamentsToShow: [
      'Iliolumbar ligament .r', 'Anterior sacro-iliac ligament.r', 'Interossea / Posterior sacro-iliac ligament.r'
    ]
  },
  spineLateralFlex: {
    id: 'spineLateralFlex',
    name: 'Spine Lateral Flexion',
    axis: vec3(0, 0, 1),
    minDeg: -40,
    maxDeg: 40,
    neutralDeg: 0,
    region: 'axial',
    primaryBones: [
      'Lumbar vertebra (L1)', 'Lumbar vertebra (L2)', 'Lumbar vertebra (L3)', 'Lumbar vertebra (L4)', 'Lumbar vertebra (L5)'
    ],
    secondaryBones: [
      'Thoracic vertebra (T10)', 'Thoracic vertebra (T11)', 'Thoracic vertebra (T12)'
    ],
    musclesToHighlight: [
      'Psoas major.r', 'Iliacus muscle.r'
    ],
    ligamentsToShow: [
      'Iliolumbar ligament .r'
    ]
  },
  spineRotation: {
    id: 'spineRotation',
    name: 'Spine Rotation',
    axis: vec3(0, 1, 0),
    minDeg: -45,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'axial',
    primaryBones: [
      'Thoracic vertebra (T1)', 'Thoracic vertebra (T2)', 'Thoracic vertebra (T3)', 'Thoracic vertebra (T4)', 'Thoracic vertebra (T5)',
      'Thoracic vertebra (T6)', 'Thoracic vertebra (T7)', 'Thoracic vertebra (T8)', 'Thoracic vertebra (T9)', 'Thoracic vertebra (T10)'
    ],
    secondaryBones: [
      'Rib (1st).r', 'Rib (2nd).r', 'Rib (3rd).r', 'Rib (4th).r', 'Rib (5th).r',
      'Rib (6th).r', 'Rib (7th).r', 'Rib (8th).r', 'Rib (9th).r', 'Rib (10th).r'
    ],
    musclesToHighlight: [],
    ligamentsToShow: []
  },

  // ============================================================================
  // SCAPULA - With full 3D model tag integration
  // ============================================================================
  scapulaElevDep: {
    id: 'scapulaElevDep',
    name: 'Scapular Elevation/Depression',
    axis: vec3(0, 1, 0),
    minDeg: -10,
    maxDeg: 10,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Scapula.r.', 'Clavicle.r'],
    secondaryBones: [],
    musclesToHighlight: [
      // Elevators
      'Trapezius muscle.r', 'Descending part of Trapezius muscle.r',
      'Levator scapulae.r', 'Rhomboid major muscle.r', 'Rhomboid minor muscle.r',
      // Depressors
      'Ascending part of Trapezius muscle.r', 'Serratus anterior muscle.r',
      'Pectoralis minor muscle.r', 'Subclavius muscle.r'
    ],
    ligamentsToShow: [
      'Acromioclavicular ligament.r', 'Coracoclavicular ligament.r',
      'Conoid ligament (part of coracoclavicular ligament).r', 'Trapezoid ligament (part of coracoclavicular ligament).r'
    ]
  },
  scapulaProRet: {
    id: 'scapulaProRet',
    name: 'Scapular Protraction/Retraction',
    axis: vec3(1, 0, 0),
    minDeg: -15,
    maxDeg: 15,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Scapula.r.'],
    secondaryBones: ['Clavicle.r'],
    musclesToHighlight: [
      // Protractors
      'Serratus anterior muscle.r', 'Pectoralis minor muscle.r',
      // Retractors
      'Trapezius muscle.r', 'Transverse part of trapezius muscle.r',
      'Rhomboid major muscle.r', 'Rhomboid minor muscle.r'
    ],
    ligamentsToShow: [
      'Acromioclavicular ligament.r', 'Superior transverse scapular ligament.r'
    ]
  },
  scapulaRotation: {
    id: 'scapulaRotation',
    name: 'Scapular Upward/Downward Rotation',
    axis: vec3(0, 0, 1),
    minDeg: -30,
    maxDeg: 60,
    neutralDeg: 0,
    region: 'upper',
    primaryBones: ['Scapula.r.'],
    secondaryBones: ['Clavicle.r'],
    musclesToHighlight: [
      // Upward rotators
      'Trapezius muscle.r', 'Descending part of Trapezius muscle.r', 'Ascending part of Trapezius muscle.r',
      'Serratus anterior muscle.r',
      // Downward rotators
      'Levator scapulae.r', 'Rhomboid major muscle.r', 'Rhomboid minor muscle.r',
      'Pectoralis minor muscle.r'
    ],
    ligamentsToShow: [
      'Coracoclavicular ligament.r', 'Coraco-acromial ligament.r'
    ]
  },

  // ============================================================================
  // FINGER/THUMB - With full 3D model tag integration
  // ============================================================================
  fingerFlexExt: {
    id: 'fingerFlexExt',
    name: 'Finger Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: 0,
    maxDeg: 90,
    neutralDeg: 0,
    region: 'hand',
    primaryBones: [
      'Proximal phalanx of 2d finger.r', 'Proximal phalanx of 3rd finger.r', 'Proximal phalanx of 4th finger.r', 'Proximal phalanx of 5th finger.r',
      'Middle phalanx of 2d finger.r', 'Middle phalanx of 3rd finger.r', 'Middle phalanx of 4th finger.r', 'Middle phalanx of 5th finger.r',
      'Distal phalanx of 2d finger.r', 'Distal phalanx of 3d finger.r', 'Distal phalanx of 4th finger.r', 'Distal phalanx of 5th finger.r'
    ],
    secondaryBones: [],
    musclesToHighlight: [
      // Flexors
      'Flexor digitorum profundus.r', 'Flexor digitorum superficialis humero-ulnar head.r',
      '1st lumbrical of hand.r', '2nd lumbrical of hand.r', '3rd lumbrical of hand.r', '4th lumbrical of hand.r',
      '1st palmar interosseus of hand.r', '2nd palmar interosseus of hand.r', '3rd palmar interosseus of hand.r',
      'Flexor digiti minimi brevis of hand.r',
      // Extensors
      'Extensor digitorum.r', 'Extensor indicis.r', 'Extensor digiti minimi.r',
      '1st dorsal interosseus of hand.r', '2nd dorsal interosseus of hand.r', '3rd dorsal interosseus of hand.r', '4th dorsal interosseus of hand.r'
    ],
    ligamentsToShow: [
      'Annular ligaments of 2nd finger A1-A5.r', 'Annular ligaments of 3rd finger A1-A5.r',
      'Annular ligaments of 4th finger A1-A5.r', 'Annular ligaments of 5th finger A1-A5.r',
      'Collateral ligaments of metacarpophalangeal joints.r'
    ]
  },
  thumbOpposition: {
    id: 'thumbOpposition',
    name: 'Thumb Opposition',
    axis: vec3(0.5, 0.5, 0.7),
    minDeg: 0,
    maxDeg: 60,
    neutralDeg: 0,
    region: 'hand',
    primaryBones: [
      '1st metacarpal bone.r', 'Proximal phalanx of 1st finger.r', 'Distal phalanx of 1st finger.r', 'Trapezium.r'
    ],
    secondaryBones: [],
    musclesToHighlight: [
      'Opponens pollicis muscle.r', 'Abductor pollicis brevis.r', 'Flexor pollicis longus.r',
      'Deep head of flexor pollicis brevis.r', 'Superficial head of flexor pollicis brevis.r',
      'Adductor pollicis.r', 'Oblique head of adductor pollicis.r', 'Transverse head of adductor pollicis.r'
    ],
    ligamentsToShow: [
      'Annular ligament(A1) of 1st finger.r', 'Annular ligament(A2) of 1st finger.r',
      'Oblique ligament of 1st finger.r', 'Collateral ligaments of interphalangeal joints.r'
    ]
  },

  // ============================================================================
  // TOE - With full 3D model tag integration
  // ============================================================================
  toeFlexExt: {
    id: 'toeFlexExt',
    name: 'Toe Flexion/Extension',
    axis: vec3(1, 0, 0),
    minDeg: -30,
    maxDeg: 70,
    neutralDeg: 0,
    region: 'foot',
    primaryBones: [
      'Proximal phalanx of first finger of foot.r', 'Proximal phalanx of second finger of foot.r', 'Proximal phalanx of third finger of foot.r',
      'Proximal phalanx of fourth finger of foot.r', 'Proximal phalanx of fifth finger of foot.r',
      'Distal phalanx of first finger of foot.r', 'Distal phalanx of second finger of foot.r', 'Distal phalanx of third finger of foot.r',
      'Distal phalanx of fourth finger of foot.r', 'Distal phalanx of fifth finger of foot.r'
    ],
    secondaryBones: [],
    musclesToHighlight: [
      // Flexors
      'Flexor digitorum longus.r', 'Flexor digitorum brevis.r', 'Flexor hallucis longus.r',
      'Lumbrical muscles of foot.r', 'Quadratus plantae muscle.r',
      'Lateral head of flexor hallucis brevis.r', 'Medial head of flexor hallucis brevis.r',
      'Flexor digiti minimi brevis of foot.r',
      // Extensors
      'Extensor digitorum longus.r', 'Extensor digitorum brevis.r',
      'Extensor hallucis longus.r', 'Extensor hallucis brevis.r'
    ],
    ligamentsToShow: [
      'Annular ligaments of 1st toe A1-A5.r', 'Annular ligaments of 2nd toe A1-A5.r',
      'Plantar ligaments of metatarsophalangeal joints'
    ]
  }
};

// ============================================================================
// LAYER PRESETS - For toggling visibility of anatomical systems
// ============================================================================

export interface LayerPreset {
  id: string;
  name: string;
  description: string;
  showCategories: string[]; // Categories to show
  opacity: number; // Default opacity for this layer
}

export const LAYER_PRESETS: Record<string, LayerPreset> = {
  bones: {
    id: 'bones',
    name: 'Skeletal System',
    description: 'Show only bones',
    showCategories: ['bones'],
    opacity: 1.0
  },
  muscles: {
    id: 'muscles',
    name: 'Muscular System',
    description: 'Show muscles and bones',
    showCategories: ['bones', 'muscles'],
    opacity: 0.9
  },
  ligaments: {
    id: 'ligaments',
    name: 'Ligaments & Joints',
    description: 'Show ligaments with bones',
    showCategories: ['bones', 'ligaments', 'jointCapsules', 'cartilages'],
    opacity: 1.0
  },
  vessels: {
    id: 'vessels',
    name: 'Vascular System',
    description: 'Show arteries and veins',
    showCategories: ['bones', 'arteries', 'veins'],
    opacity: 0.85
  },
  nerves: {
    id: 'nerves',
    name: 'Nervous System',
    description: 'Show nerves',
    showCategories: ['bones', 'nerves'],
    opacity: 0.85
  },
  tendons: {
    id: 'tendons',
    name: 'Tendons & Sheaths',
    description: 'Show tendons and their sheaths',
    showCategories: ['bones', 'tendons', 'fibrousSheaths'],
    opacity: 0.9
  },
  fascia: {
    id: 'fascia',
    name: 'Fascia & Retinacula',
    description: 'Show fascial structures',
    showCategories: ['bones', 'muscles', 'fascia'],
    opacity: 0.8
  },
  all: {
    id: 'all',
    name: 'All Structures',
    description: 'Show all anatomical structures',
    showCategories: ['bones', 'muscles', 'tendons', 'ligaments', 'arteries', 'veins', 'nerves', 'cartilages', 'fascia', 'jointCapsules'],
    opacity: 0.7
  }
};

// ============================================================================
// VISIBILITY PROFILES - Per-motion visibility configurations
// ============================================================================

export interface VisibilityProfile {
  motionId: string;
  hideNodes: string[]; // Node patterns to hide during this motion
  highlightNodes: string[]; // Nodes to highlight/emphasize
  transparentNodes: string[]; // Nodes to make semi-transparent
  cameraFocus?: string; // Node to focus camera on
}

export const VISIBILITY_PROFILES: Record<string, VisibilityProfile> = {
  shoulderFlexion: {
    motionId: 'shoulderFlexion',
    hideNodes: [
      // Hide deep structures that obstruct view
      'Brachial plexus', 'Subclavian artery', 'Subclavian vein'
    ],
    highlightNodes: [
      'Deltoid muscle.r', 'Acromial part of deltoid muscle.r', 'Clavicular part of deltoid muscle.r',
      'Pectoralis major muscle.r', 'Biceps brachii muscle.r', 'Coracobrachialis muscle.r'
    ],
    transparentNodes: [
      'Trapezius muscle.r', 'Latissimus dorsi muscle.r'
    ],
    cameraFocus: 'Shoulder joint capsule.r'
  },
  shoulderExtension: {
    motionId: 'shoulderExtension',
    hideNodes: [],
    highlightNodes: [
      'Latissimus dorsi muscle.r', 'Teres major muscle.r', 
      'Spinal part of deltoid muscle.r', 'Long head of triceps brachii muscle.r'
    ],
    transparentNodes: [
      'Trapezius muscle.r'
    ],
    cameraFocus: 'Shoulder joint capsule.r'
  },
  elbowFlexion: {
    motionId: 'elbowFlexion',
    hideNodes: [],
    highlightNodes: [
      'Biceps brachii muscle.r', 'Long head of biceps brachii muscle.r', 'Short head of biceps brachii muscle.r',
      'Brachialis muscle.r', 'Brachioradialis muscle.r'
    ],
    transparentNodes: [
      'Triceps brachii muscle.r'
    ],
    cameraFocus: 'Elbow joint capsule.r'
  },
  elbowExtension: {
    motionId: 'elbowExtension',
    hideNodes: [],
    highlightNodes: [
      'Triceps brachii muscle.r', 'Long head of triceps brachii muscle.r',
      'Lateral head of triceps brachii muscle.r', 'Medial head of triceps brachii muscle.r', 'Anconeus muscle.r'
    ],
    transparentNodes: [
      'Biceps brachii muscle.r'
    ],
    cameraFocus: 'Elbow joint capsule.r'
  },
  hipFlexion: {
    motionId: 'hipFlexion',
    hideNodes: [],
    highlightNodes: [
      'Iliacus muscle.r', 'Psoas major.r', 'Rectus femoris.r', 
      'Sartorius muscle.r', 'Tensor fasciae latae.r', 'Pectineus muscle.r'
    ],
    transparentNodes: [
      'Gluteus maximus muscle.r'
    ],
    cameraFocus: 'Hip bone.r'
  },
  hipExtension: {
    motionId: 'hipExtension',
    hideNodes: [],
    highlightNodes: [
      'Gluteus maximus muscle.r', 'Long head of biceps femoris.r', 
      'Semimembranosus muscle.r', 'Semitendinosus muscle.r', 'Adductor magnus.r'
    ],
    transparentNodes: [
      'Rectus femoris.r', 'Sartorius muscle.r'
    ],
    cameraFocus: 'Hip bone.r'
  },
  kneeFlexion: {
    motionId: 'kneeFlexion',
    hideNodes: [],
    highlightNodes: [
      'Long head of biceps femoris.r', 'Short head of biceps femoris.r',
      'Semimembranosus muscle.r', 'Semitendinosus muscle.r',
      'Lateral head of gastrocnemius.r', 'Medial head of gastrocnemius.r',
      'Sartorius muscle.r', 'Gracilis muscle.r', 'Popliteus muscle.r'
    ],
    transparentNodes: [
      'Rectus femoris.r', 'Vastus lateralis muscle.r', 'Vastus medialis muscle.r'
    ],
    cameraFocus: 'Patella.r'
  },
  kneeExtension: {
    motionId: 'kneeExtension',
    hideNodes: [],
    highlightNodes: [
      'Rectus femoris.r', 'Vastus lateralis muscle.r', 
      'Vastus medialis muscle.r', 'Vastus intermedius muscle.r'
    ],
    transparentNodes: [
      'Long head of biceps femoris.r', 'Semimembranosus muscle.r'
    ],
    cameraFocus: 'Patella.r'
  },
  ankleDorsiflexion: {
    motionId: 'ankleDorsiflexion',
    hideNodes: [],
    highlightNodes: [
      'Tibialis anterior muscle.r', 'Extensor digitorum longus.r',
      'Extensor hallucis longus.r', 'Fibularis tertius muscle.r'
    ],
    transparentNodes: [
      'Soleus muscle.r', 'Lateral head of gastrocnemius.r'
    ],
    cameraFocus: 'Talus.r'
  },
  anklePlantarflexion: {
    motionId: 'anklePlantarflexion',
    hideNodes: [],
    highlightNodes: [
      'Lateral head of gastrocnemius.r', 'Medial head of gastrocnemius.r',
      'Soleus muscle.r', 'Plantaris muscle.r', 
      'Tibialis posterior muscle.r', 'Flexor digitorum longus.r', 'Flexor hallucis longus.r',
      'Fibularis longus muscle.r', 'Fibularis brevis muscle.r'
    ],
    transparentNodes: [
      'Tibialis anterior muscle.r'
    ],
    cameraFocus: 'Calcaneus.r'
  },
  wristFlexion: {
    motionId: 'wristFlexion',
    hideNodes: [],
    highlightNodes: [
      'Flexor carpi radialis', 'Flexor carpi ulnaris', 'Palmaris longus muscle',
      'Flexor digitorum superficialis humeral head', 'Flexor digitorum profundus'
    ],
    transparentNodes: [
      'Extensor carpi radialis longus', 'Extensor carpi radialis brevis'
    ],
    cameraFocus: 'Lunate bone'
  },
  wristExtension: {
    motionId: 'wristExtension',
    hideNodes: [],
    highlightNodes: [
      'Extensor carpi radialis longus', 'Extensor carpi radialis brevis', 
      'Extensor digitorum', 'Extensor digiti minimi', 'Extensor carpi ulnaris'
    ],
    transparentNodes: [
      'Flexor carpi radialis', 'Palmaris longus muscle'
    ],
    cameraFocus: 'Lunate bone'
  },
  fingerFlexion: {
    motionId: 'fingerFlexion',
    hideNodes: [],
    highlightNodes: [
      'Flexor digitorum profundus', 'Flexor digitorum superficialis humeral head',
      '1st lumbrical of hand', '2nd lumbrical of hand', '3rd lumbrical of hand', '4th lumbrical of hand',
      'Flexor digiti minimi brevis of hand'
    ],
    transparentNodes: [
      'Extensor digitorum'
    ],
    cameraFocus: 'Proximal phalanx of 3rd finger'
  },
  fingerExtension: {
    motionId: 'fingerExtension',
    hideNodes: [],
    highlightNodes: [
      'Extensor digitorum', 'Extensor indicis', 'Extensor digiti minimi',
      '1st dorsal interosseus of hand', '2nd dorsal interosseus of hand', '3rd dorsal interosseus of hand', '4th dorsal interosseus of hand',
      '1st lumbrical of hand', '2nd lumbrical of hand'
    ],
    transparentNodes: [
      'Flexor digitorum superficialis humeral head'
    ],
    cameraFocus: 'Proximal phalanx of 3rd finger'
  },
  thumbOpposition: {
    motionId: 'thumbOpposition',
    hideNodes: [],
    highlightNodes: [
      'Opponens pollicis muscle', 'Flexor pollicis brevis', 'Abductor pollicis brevis',
      'Adductor pollicis', 'Flexor pollicis longus'
    ],
    transparentNodes: [
      'Extensor pollicis longus', 'Extensor pollicis brevis'
    ],
    cameraFocus: '1st metacarpal bone'
  }
};

// ============================================================================
// MOTION DEFINITIONS - Enhanced with educational features
// ============================================================================

export interface MotionDefinition {
  id: string;
  name: string;
  displayName: string;
  joint: JointSpec;
  targetDeg: number;
  duration: number; // seconds for full motion cycle
  description: string;
  region: 'upper' | 'lower' | 'axial' | 'hand' | 'foot';
  keywords: string[]; // For search/filtering
  // NEW: Educational fields
  learningTips: string[];
  clinicalRelevance: string;
  commonErrors: string[];
  antagonistMotion?: string; // ID of the opposing motion
}

export const MOTIONS: Record<string, MotionDefinition> = {
  // ============================================================================
  // SHOULDER MOTIONS
  // ============================================================================
  shoulderFlexion: {
    id: 'shoulderFlexion',
    name: 'Shoulder Flexion',
    displayName: 'Shoulder Flexion',
    joint: JOINTS.shoulderFlexExt,
    targetDeg: 180,
    duration: 3.0,
    description: 'Raising arm forward and upward in the sagittal plane',
    region: 'upper',
    keywords: ['shoulder', 'flex', 'raise', 'forward', 'anterior', 'sagittal'],
    learningTips: [
      'Anterior deltoid is the prime mover',
      'Clavicular head of pectoralis major assists',
      'Biceps brachii (long head) contributes',
      'Scapula upwardly rotates after 90° (scapulohumeral rhythm)'
    ],
    clinicalRelevance: 'Limited shoulder flexion can indicate rotator cuff pathology, adhesive capsulitis, or biceps tendinitis.',
    commonErrors: ['Compensating with trunk extension', 'Not achieving full overhead range'],
    antagonistMotion: 'shoulderExtension'
  },
  shoulderExtension: {
    id: 'shoulderExtension',
    name: 'Shoulder Extension',
    displayName: 'Shoulder Extension',
    joint: JOINTS.shoulderFlexExt,
    targetDeg: -60,
    duration: 2.5,
    description: 'Moving arm backward from neutral position',
    region: 'upper',
    keywords: ['shoulder', 'extend', 'back', 'posterior'],
    learningTips: [
      'Posterior deltoid is the prime mover',
      'Latissimus dorsi and teres major are powerful extensors',
      'Long head of triceps assists',
      'Important for pushing motions and reaching behind'
    ],
    clinicalRelevance: 'Essential for activities like pushing up from a chair or reaching behind the back.',
    commonErrors: ['Excessive scapular protraction', 'Trunk flexion compensation'],
    antagonistMotion: 'shoulderFlexion'
  },
  shoulderAbduction: {
    id: 'shoulderAbduction',
    name: 'Shoulder Abduction',
    displayName: 'Shoulder Abduction',
    joint: JOINTS.shoulderAbdAdd,
    targetDeg: 180,
    duration: 3.0,
    description: 'Raising arm laterally away from body in the frontal plane',
    region: 'upper',
    keywords: ['shoulder', 'abduct', 'lateral', 'raise', 'side', 'frontal'],
    learningTips: [
      'Supraspinatus initiates first 15-30° (critical role)',
      'Middle deltoid takes over as prime mover',
      'Scapulohumeral rhythm: 2:1 ratio (GH:scapular movement)',
      'Upper trapezius and serratus anterior rotate scapula'
    ],
    clinicalRelevance: 'Painful arc (60-120°) often indicates subacromial impingement. Supraspinatus tears cause weakness in initiation.',
    commonErrors: ['Hiking the shoulder (upper trap dominance)', 'Trunk lateral flexion compensation'],
    antagonistMotion: 'shoulderAdduction'
  },
  shoulderAdduction: {
    id: 'shoulderAdduction',
    name: 'Shoulder Adduction',
    displayName: 'Shoulder Adduction',
    joint: JOINTS.shoulderAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Lowering arm toward body midline',
    region: 'upper',
    keywords: ['shoulder', 'adduct', 'medial', 'lower'],
    learningTips: [
      'Pectoralis major is the prime mover',
      'Latissimus dorsi and teres major assist',
      'Gravity assists in lowering the arm',
      'Coracobrachialis contributes'
    ],
    clinicalRelevance: 'Important for activities requiring arm control toward the body midline.',
    commonErrors: ['Losing control during descent'],
    antagonistMotion: 'shoulderAbduction'
  },
  shoulderMedialRotation: {
    id: 'shoulderMedialRotation',
    name: 'Shoulder Medial Rotation',
    displayName: 'Shoulder Internal Rotation',
    joint: JOINTS.shoulderRotation,
    targetDeg: -90,
    duration: 2.0,
    description: 'Rotating humerus inward (thumb moves toward body)',
    region: 'upper',
    keywords: ['shoulder', 'medial', 'internal', 'rotation', 'IR'],
    learningTips: [
      'Subscapularis is the primary rotator cuff medial rotator',
      'Pectoralis major and latissimus dorsi are powerful assistants',
      'Teres major and anterior deltoid contribute',
      'Test with arm at side or 90° abduction'
    ],
    clinicalRelevance: 'Limited IR (GIRD) common in throwing athletes. Subscapularis tears reduce internal rotation strength.',
    commonErrors: ['Scapular winging', 'Elbow flexion compensation'],
    antagonistMotion: 'shoulderLateralRotation'
  },
  shoulderLateralRotation: {
    id: 'shoulderLateralRotation',
    name: 'Shoulder Lateral Rotation',
    displayName: 'Shoulder External Rotation',
    joint: JOINTS.shoulderRotation,
    targetDeg: 90,
    duration: 2.0,
    description: 'Rotating humerus outward (thumb moves away from body)',
    region: 'upper',
    keywords: ['shoulder', 'lateral', 'external', 'rotation', 'ER'],
    learningTips: [
      'Infraspinatus is the prime mover',
      'Teres minor assists (also provides humeral head depression)',
      'Posterior deltoid contributes',
      'Critical for overhead athletes (throwing)'
    ],
    clinicalRelevance: 'Weakness indicates infraspinatus/teres minor pathology. Key for rotator cuff assessment.',
    commonErrors: ['Elbow moving away from body', 'Shoulder hiking'],
    antagonistMotion: 'shoulderMedialRotation'
  },
  shoulderHorizAbduction: {
    id: 'shoulderHorizAbduction',
    name: 'Shoulder Horizontal Abduction',
    displayName: 'Shoulder Horizontal Abduction',
    joint: JOINTS.shoulderHorizAbdAdd,
    targetDeg: 135,
    duration: 2.0,
    description: 'Moving arm horizontally backward with arm at 90° flexion',
    region: 'upper',
    keywords: ['shoulder', 'horizontal', 'abduction', 'transverse', 'posterior'],
    learningTips: [
      'Posterior deltoid is the prime mover',
      'Middle trapezius and rhomboids stabilize scapula',
      'Infraspinatus and teres minor assist',
      'Important for rowing and pulling motions'
    ],
    clinicalRelevance: 'Tests posterior deltoid and scapular retractors. Important for posture correction.',
    commonErrors: ['Trunk rotation', 'Scapular protraction'],
    antagonistMotion: 'shoulderHorizAdduction'
  },
  shoulderHorizAdduction: {
    id: 'shoulderHorizAdduction',
    name: 'Shoulder Horizontal Adduction',
    displayName: 'Shoulder Horizontal Adduction',
    joint: JOINTS.shoulderHorizAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Moving arm horizontally forward with arm at 90° flexion',
    region: 'upper',
    keywords: ['shoulder', 'horizontal', 'adduction', 'transverse', 'anterior'],
    learningTips: [
      'Pectoralis major is the prime mover',
      'Anterior deltoid assists',
      'Important for hugging motions and pushing',
      'Serratus anterior protracts scapula'
    ],
    clinicalRelevance: 'Cross-body adduction test stresses AC joint. Important for pushing activities.',
    commonErrors: ['Excessive scapular protraction', 'Trunk rotation'],
    antagonistMotion: 'shoulderHorizAbduction'
  },

  // ============================================================================
  // ELBOW MOTIONS
  // ============================================================================
  elbowFlexion: {
    id: 'elbowFlexion',
    name: 'Elbow Flexion',
    displayName: 'Elbow Flexion',
    joint: JOINTS.elbowFlexExt,
    targetDeg: 145,
    duration: 2.0,
    description: 'Bending elbow to decrease angle between forearm and upper arm',
    region: 'upper',
    keywords: ['elbow', 'flex', 'bend', 'curl', 'biceps'],
    learningTips: [
      'Biceps brachii: flexor AND supinator',
      'Brachialis: pure flexor (strongest)',
      'Brachioradialis: flexor, especially with forearm in neutral',
      'Biceps is most efficient with forearm supinated'
    ],
    clinicalRelevance: 'Biceps tendon rupture causes weakness. Brachialis testing requires pronated forearm.',
    commonErrors: ['Using shoulder to lift', 'Not achieving full ROM'],
    antagonistMotion: 'elbowExtension'
  },
  elbowExtension: {
    id: 'elbowExtension',
    name: 'Elbow Extension',
    displayName: 'Elbow Extension',
    joint: JOINTS.elbowFlexExt,
    targetDeg: 0,
    duration: 2.0,
    description: 'Straightening elbow to increase angle',
    region: 'upper',
    keywords: ['elbow', 'extend', 'straight', 'triceps'],
    learningTips: [
      'Triceps brachii is the prime mover (3 heads)',
      'Long head crosses shoulder joint',
      'Anconeus assists and stabilizes elbow',
      'Important for pushing and weight-bearing'
    ],
    clinicalRelevance: 'Triceps weakness affects transfers and pushing. Long head contributes to shoulder extension.',
    commonErrors: ['Hyperextension', 'Using gravity instead of muscle'],
    antagonistMotion: 'elbowFlexion'
  },

  // ============================================================================
  // FOREARM MOTIONS
  // ============================================================================
  forearmPronation: {
    id: 'forearmPronation',
    name: 'Forearm Pronation',
    displayName: 'Forearm Pronation',
    joint: JOINTS.forearmProSup,
    targetDeg: 90,
    duration: 1.5,
    description: 'Rotating forearm to turn palm downward/backward',
    region: 'upper',
    keywords: ['forearm', 'pronation', 'palm', 'down', 'rotate'],
    learningTips: [
      'Pronator teres: main pronator with elbow extended',
      'Pronator quadratus: constant pronator at all positions',
      'Radius crosses over ulna',
      'Important for pouring and typing motions'
    ],
    clinicalRelevance: 'Pronator syndrome can compress median nerve. Essential for many daily activities.',
    commonErrors: ['Shoulder internal rotation compensation', 'Wrist deviation'],
    antagonistMotion: 'forearmSupination'
  },
  forearmSupination: {
    id: 'forearmSupination',
    name: 'Forearm Supination',
    displayName: 'Forearm Supination',
    joint: JOINTS.forearmProSup,
    targetDeg: -90,
    duration: 1.5,
    description: 'Rotating forearm to turn palm upward/forward',
    region: 'upper',
    keywords: ['forearm', 'supination', 'palm', 'up', 'rotate'],
    learningTips: [
      'Supinator: works at all elbow positions',
      'Biceps brachii: most powerful supinator with elbow flexed 90°',
      'Radius uncrosses from ulna',
      'Think "supination = soup in palm"'
    ],
    clinicalRelevance: 'Supinator syndrome can compress posterior interosseous nerve. Biceps important for power supination.',
    commonErrors: ['Shoulder external rotation compensation', 'Wrist extension'],
    antagonistMotion: 'forearmPronation'
  },

  // ============================================================================
  // WRIST MOTIONS
  // ============================================================================
  wristFlexion: {
    id: 'wristFlexion',
    name: 'Wrist Flexion',
    displayName: 'Wrist Flexion',
    joint: JOINTS.wristFlexExt,
    targetDeg: -80,
    duration: 1.5,
    description: 'Bending wrist toward palm (palmar flexion)',
    region: 'hand',
    keywords: ['wrist', 'flex', 'palmar', 'volar'],
    learningTips: [
      'Flexor carpi radialis: flexes and radially deviates',
      'Flexor carpi ulnaris: flexes and ulnarly deviates',
      'Palmaris longus: weak flexor (absent in ~14%)',
      'Finger flexors assist when fingers flex'
    ],
    clinicalRelevance: 'Flexor tendinitis common. Carpal tunnel syndrome affects wrist flexors.',
    commonErrors: ['Finger flexion instead of wrist', 'Deviation from neutral'],
    antagonistMotion: 'wristExtension'
  },
  wristExtension: {
    id: 'wristExtension',
    name: 'Wrist Extension',
    displayName: 'Wrist Extension',
    joint: JOINTS.wristFlexExt,
    targetDeg: 70,
    duration: 1.5,
    description: 'Bending wrist toward back of hand (dorsiflexion)',
    region: 'hand',
    keywords: ['wrist', 'extend', 'dorsal', 'dorsiflexion'],
    learningTips: [
      'ECRL and ECRB: extend and radially deviate',
      'ECU: extends and ulnarly deviates',
      'Required for power grip',
      'Finger extensors assist'
    ],
    clinicalRelevance: 'Lateral epicondylitis (tennis elbow) affects wrist extensors. Essential for grip strength.',
    commonErrors: ['Finger extension instead of wrist', 'Radial deviation'],
    antagonistMotion: 'wristFlexion'
  },
  wristRadialDeviation: {
    id: 'wristRadialDeviation',
    name: 'Wrist Radial Deviation',
    displayName: 'Wrist Radial Deviation',
    joint: JOINTS.wristDeviation,
    targetDeg: 20,
    duration: 1.5,
    description: 'Tilting wrist toward thumb side (radial side)',
    region: 'hand',
    keywords: ['wrist', 'radial', 'abduction', 'thumb', 'lateral'],
    learningTips: [
      'ECRL and ECRB on dorsal side',
      'FCR on palmar side',
      'Abductor pollicis longus assists',
      'Less ROM than ulnar deviation'
    ],
    clinicalRelevance: 'De Quervain tenosynovitis affects APL and EPB.',
    commonErrors: ['Wrist extension compensation', 'Forearm rotation'],
    antagonistMotion: 'wristUlnarDeviation'
  },
  wristUlnarDeviation: {
    id: 'wristUlnarDeviation',
    name: 'Wrist Ulnar Deviation',
    displayName: 'Wrist Ulnar Deviation',
    joint: JOINTS.wristDeviation,
    targetDeg: -30,
    duration: 1.5,
    description: 'Tilting wrist toward pinky side (ulnar side)',
    region: 'hand',
    keywords: ['wrist', 'ulnar', 'adduction', 'pinky', 'medial'],
    learningTips: [
      'ECU on dorsal side',
      'FCU on palmar side',
      'Greater ROM than radial deviation',
      'Important for hammer swing motion'
    ],
    clinicalRelevance: 'ECU tendinitis common in athletes. TFCC injuries affect ulnar wrist.',
    commonErrors: ['Wrist flexion compensation', 'Forearm pronation'],
    antagonistMotion: 'wristRadialDeviation'
  },

  // ============================================================================
  // HIP MOTIONS
  // ============================================================================
  hipFlexion: {
    id: 'hipFlexion',
    name: 'Hip Flexion',
    displayName: 'Hip Flexion',
    joint: JOINTS.hipFlexExt,
    targetDeg: 125,
    duration: 2.5,
    description: 'Bringing thigh toward torso',
    region: 'lower',
    keywords: ['hip', 'flex', 'thigh', 'raise', 'iliopsoas'],
    learningTips: [
      'Iliopsoas is the most powerful hip flexor',
      'Rectus femoris: flexes hip and extends knee',
      'Sartorius: flexes, abducts, and externally rotates',
      'TFL: flexes, abducts, and internally rotates'
    ],
    clinicalRelevance: 'Hip flexor tightness (psoas) causes anterior pelvic tilt and low back pain.',
    commonErrors: ['Lumbar flexion compensation', 'External rotation'],
    antagonistMotion: 'hipExtension'
  },
  hipExtension: {
    id: 'hipExtension',
    name: 'Hip Extension',
    displayName: 'Hip Extension',
    joint: JOINTS.hipFlexExt,
    targetDeg: -30,
    duration: 2.5,
    description: 'Moving thigh backward behind body',
    region: 'lower',
    keywords: ['hip', 'extend', 'thigh', 'back', 'glute'],
    learningTips: [
      'Gluteus maximus is the prime mover',
      'Hamstrings assist (especially with knee extended)',
      'Adductor magnus (posterior fibers) assists',
      'Critical for standing up, stairs, running'
    ],
    clinicalRelevance: 'Gluteus maximus weakness affects stair climbing and standing. Hip flexor tightness limits extension.',
    commonErrors: ['Lumbar hyperextension', 'Anterior pelvic tilt'],
    antagonistMotion: 'hipFlexion'
  },
  hipAbduction: {
    id: 'hipAbduction',
    name: 'Hip Abduction',
    displayName: 'Hip Abduction',
    joint: JOINTS.hipAbdAdd,
    targetDeg: 45,
    duration: 2.0,
    description: 'Moving thigh laterally away from midline',
    region: 'lower',
    keywords: ['hip', 'abduct', 'lateral', 'side', 'gluteus medius'],
    learningTips: [
      'Gluteus medius is the prime mover',
      'Gluteus minimus assists',
      'TFL assists (with internal rotation)',
      'Critical for single-leg stance stability'
    ],
    clinicalRelevance: 'Weakness causes Trendelenburg gait (pelvis drops on swing side).',
    commonErrors: ['Trunk lateral flexion', 'Hip hiking'],
    antagonistMotion: 'hipAdduction'
  },
  hipAdduction: {
    id: 'hipAdduction',
    name: 'Hip Adduction',
    displayName: 'Hip Adduction',
    joint: JOINTS.hipAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Moving thigh toward midline',
    region: 'lower',
    keywords: ['hip', 'adduct', 'medial', 'groin'],
    learningTips: [
      'Adductor longus, brevis, magnus are primary',
      'Gracilis crosses hip and knee',
      'Pectineus also flexes hip',
      'Important for stabilization during gait'
    ],
    clinicalRelevance: 'Adductor strains common in sports ("groin pull").',
    commonErrors: ['Hip flexion compensation', 'Pelvic rotation'],
    antagonistMotion: 'hipAbduction'
  },
  hipMedialRotation: {
    id: 'hipMedialRotation',
    name: 'Hip Medial Rotation',
    displayName: 'Hip Internal Rotation',
    joint: JOINTS.hipRotation,
    targetDeg: -45,
    duration: 2.0,
    description: 'Rotating femur inward (toe-in)',
    region: 'lower',
    keywords: ['hip', 'medial', 'internal', 'rotation', 'IR'],
    learningTips: [
      'Gluteus medius (anterior fibers) primary',
      'Gluteus minimus assists',
      'TFL assists',
      'Adductors also contribute'
    ],
    clinicalRelevance: 'Limited IR can indicate hip joint pathology or femoral retroversion.',
    commonErrors: ['Knee valgus', 'Trunk rotation'],
    antagonistMotion: 'hipLateralRotation'
  },
  hipLateralRotation: {
    id: 'hipLateralRotation',
    name: 'Hip Lateral Rotation',
    displayName: 'Hip External Rotation',
    joint: JOINTS.hipRotation,
    targetDeg: 45,
    duration: 2.0,
    description: 'Rotating femur outward (toe-out)',
    region: 'lower',
    keywords: ['hip', 'lateral', 'external', 'rotation', 'ER'],
    learningTips: [
      'Deep lateral rotators: piriformis, obturators, gemelli, quadratus femoris',
      'Gluteus maximus assists',
      'Sartorius assists with hip flexed',
      'Important for crossing legs'
    ],
    clinicalRelevance: 'Piriformis syndrome can compress sciatic nerve. Important in hip OA assessment.',
    commonErrors: ['Pelvic rotation', 'Knee internal rotation'],
    antagonistMotion: 'hipMedialRotation'
  },

  // ============================================================================
  // KNEE MOTIONS
  // ============================================================================
  kneeFlexion: {
    id: 'kneeFlexion',
    name: 'Knee Flexion',
    displayName: 'Knee Flexion',
    joint: JOINTS.kneeFlexExt,
    targetDeg: 140,
    duration: 2.0,
    description: 'Bending knee to decrease angle',
    region: 'lower',
    keywords: ['knee', 'flex', 'bend', 'hamstring'],
    learningTips: [
      'Hamstrings are prime movers',
      'Biceps femoris: flexes and externally rotates tibia',
      'Semis: flex and internally rotate tibia',
      'Gastrocnemius assists (crosses knee)'
    ],
    clinicalRelevance: 'Hamstring strains common in athletes. ACL injuries often involve knee flexion mechanism.',
    commonErrors: ['Hip flexion compensation', 'Ankle dorsiflexion'],
    antagonistMotion: 'kneeExtension'
  },
  kneeExtension: {
    id: 'kneeExtension',
    name: 'Knee Extension',
    displayName: 'Knee Extension',
    joint: JOINTS.kneeFlexExt,
    targetDeg: 0,
    duration: 2.0,
    description: 'Straightening knee',
    region: 'lower',
    keywords: ['knee', 'extend', 'straight', 'quadriceps'],
    learningTips: [
      'Quadriceps femoris is the sole extensor',
      'Rectus femoris also flexes hip',
      'VMO important for patellar tracking',
      'Last 15° requires full quad activation'
    ],
    clinicalRelevance: 'Quad weakness after ACL injury. VMO atrophy causes patellofemoral pain.',
    commonErrors: ['Hip flexion', 'Hyperextension'],
    antagonistMotion: 'kneeFlexion'
  },

  // ============================================================================
  // ANKLE MOTIONS
  // ============================================================================
  ankleDorsiflexion: {
    id: 'ankleDorsiflexion',
    name: 'Ankle Dorsiflexion',
    displayName: 'Ankle Dorsiflexion',
    joint: JOINTS.ankleFlexExt,
    targetDeg: 20,
    duration: 1.5,
    description: 'Pulling foot upward toward shin',
    region: 'foot',
    keywords: ['ankle', 'dorsiflexion', 'foot', 'up', 'tibialis anterior'],
    learningTips: [
      'Tibialis anterior is the prime mover',
      'EHL and EDL assist',
      'Critical for heel strike in gait',
      'Requires 10° for normal walking'
    ],
    clinicalRelevance: 'Foot drop indicates deep peroneal nerve or L4-L5 pathology.',
    commonErrors: ['Toe extension without ankle', 'Knee flexion'],
    antagonistMotion: 'anklePlantarflexion'
  },
  anklePlantarflexion: {
    id: 'anklePlantarflexion',
    name: 'Ankle Plantarflexion',
    displayName: 'Ankle Plantarflexion',
    joint: JOINTS.ankleFlexExt,
    targetDeg: -50,
    duration: 1.5,
    description: 'Pointing foot downward',
    region: 'foot',
    keywords: ['ankle', 'plantarflexion', 'foot', 'down', 'point', 'calf'],
    learningTips: [
      'Gastrocnemius is prime mover (knee extended)',
      'Soleus works regardless of knee position',
      'Tibialis posterior, FHL, FDL assist',
      'Peroneals also plantarflex'
    ],
    clinicalRelevance: 'Achilles tendon rupture eliminates power plantarflexion. Essential for push-off in gait.',
    commonErrors: ['Knee flexion', 'Toe flexion only'],
    antagonistMotion: 'ankleDorsiflexion'
  },
  ankleInversion: {
    id: 'ankleInversion',
    name: 'Ankle Inversion',
    displayName: 'Ankle Inversion',
    joint: JOINTS.ankleInvEv,
    targetDeg: -35,
    duration: 1.5,
    description: 'Tilting sole of foot medially (toward midline)',
    region: 'foot',
    keywords: ['ankle', 'inversion', 'medial', 'sole', 'subtalar'],
    learningTips: [
      'Tibialis posterior is the prime mover',
      'Tibialis anterior assists',
      'Occurs at subtalar joint',
      'Important for walking on uneven surfaces'
    ],
    clinicalRelevance: 'Most common ankle sprain mechanism (inversion). Tests for tibialis posterior dysfunction.',
    commonErrors: ['Plantarflexion compensation', 'Toe curling'],
    antagonistMotion: 'ankleEversion'
  },
  ankleEversion: {
    id: 'ankleEversion',
    name: 'Ankle Eversion',
    displayName: 'Ankle Eversion',
    joint: JOINTS.ankleInvEv,
    targetDeg: 15,
    duration: 1.5,
    description: 'Tilting sole of foot laterally (away from midline)',
    region: 'foot',
    keywords: ['ankle', 'eversion', 'lateral', 'sole', 'peroneal'],
    learningTips: [
      'Peroneus longus and brevis are prime movers',
      'Peroneus tertius assists',
      'Occurs at subtalar joint',
      'Important for lateral ankle stability'
    ],
    clinicalRelevance: 'Peroneal weakness allows inversion sprains. High ankle sprains involve eversion.',
    commonErrors: ['Dorsiflexion compensation', 'Hip rotation'],
    antagonistMotion: 'ankleInversion'
  },

  // ============================================================================
  // SPINE/TRUNK MOTIONS
  // ============================================================================
  spineFlexion: {
    id: 'spineFlexion',
    name: 'Spine Flexion',
    displayName: 'Trunk Flexion',
    joint: JOINTS.spineFlexExt,
    targetDeg: 85,
    duration: 2.5,
    description: 'Bending trunk forward',
    region: 'axial',
    keywords: ['spine', 'trunk', 'flex', 'forward', 'bend', 'abs'],
    learningTips: [
      'Rectus abdominis is the prime mover',
      'External and internal obliques assist',
      'Hip flexors allow pelvis to move forward',
      'Lumbar discs compressed anteriorly'
    ],
    clinicalRelevance: 'Lumbar disc herniation often aggravated by flexion. Core weakness affects trunk control.',
    commonErrors: ['Hip flexion only', 'Breath holding'],
    antagonistMotion: 'spineExtension'
  },
  spineExtension: {
    id: 'spineExtension',
    name: 'Spine Extension',
    displayName: 'Trunk Extension',
    joint: JOINTS.spineFlexExt,
    targetDeg: -30,
    duration: 2.5,
    description: 'Bending trunk backward',
    region: 'axial',
    keywords: ['spine', 'trunk', 'extend', 'backward', 'arch', 'erector spinae'],
    learningTips: [
      'Erector spinae group is the prime mover',
      'Multifidus provides segmental stability',
      'Quadratus lumborum assists',
      'Lumbar discs compressed posteriorly'
    ],
    clinicalRelevance: 'Extension intolerance suggests facet joint or stenosis pathology.',
    commonErrors: ['Cervical hyperextension', 'Hip extension'],
    antagonistMotion: 'spineFlexion'
  },
  spineLateralFlexionRight: {
    id: 'spineLateralFlexionRight',
    name: 'Spine Lateral Flexion Right',
    displayName: 'Trunk Lateral Flexion (R)',
    joint: JOINTS.spineLateralFlex,
    targetDeg: 40,
    duration: 2.0,
    description: 'Bending trunk to the right side',
    region: 'axial',
    keywords: ['spine', 'trunk', 'lateral', 'side', 'bend', 'right'],
    learningTips: [
      'Ipsilateral obliques contract',
      'Contralateral obliques eccentrically control',
      'Quadratus lumborum important',
      'Erector spinae on same side assist'
    ],
    clinicalRelevance: 'Limited lateral flexion can indicate scoliosis or segmental dysfunction.',
    commonErrors: ['Hip hiking', 'Trunk rotation'],
    antagonistMotion: 'spineLateralFlexionLeft'
  },
  spineLateralFlexionLeft: {
    id: 'spineLateralFlexionLeft',
    name: 'Spine Lateral Flexion Left',
    displayName: 'Trunk Lateral Flexion (L)',
    joint: JOINTS.spineLateralFlex,
    targetDeg: -40,
    duration: 2.0,
    description: 'Bending trunk to the left side',
    region: 'axial',
    keywords: ['spine', 'trunk', 'lateral', 'side', 'bend', 'left'],
    learningTips: [
      'Ipsilateral obliques contract',
      'Contralateral obliques eccentrically control',
      'Quadratus lumborum important',
      'Erector spinae on same side assist'
    ],
    clinicalRelevance: 'Asymmetry may indicate muscle imbalance or pathology.',
    commonErrors: ['Hip hiking', 'Trunk rotation'],
    antagonistMotion: 'spineLateralFlexionRight'
  },
  spineRotationRight: {
    id: 'spineRotationRight',
    name: 'Spine Rotation Right',
    displayName: 'Trunk Rotation (R)',
    joint: JOINTS.spineRotation,
    targetDeg: 45,
    duration: 2.0,
    description: 'Rotating trunk to the right',
    region: 'axial',
    keywords: ['spine', 'trunk', 'rotation', 'twist', 'right'],
    learningTips: [
      'Left internal oblique + right external oblique',
      'Multifidus provides segmental rotation',
      'Most rotation occurs in thoracic spine',
      'Lumbar rotation is limited'
    ],
    clinicalRelevance: 'Important for functional activities and sports. Limited rotation affects gait efficiency.',
    commonErrors: ['Pelvis rotation', 'Shoulder movement only'],
    antagonistMotion: 'spineRotationLeft'
  },
  spineRotationLeft: {
    id: 'spineRotationLeft',
    name: 'Spine Rotation Left',
    displayName: 'Trunk Rotation (L)',
    joint: JOINTS.spineRotation,
    targetDeg: -45,
    duration: 2.0,
    description: 'Rotating trunk to the left',
    region: 'axial',
    keywords: ['spine', 'trunk', 'rotation', 'twist', 'left'],
    learningTips: [
      'Right internal oblique + left external oblique',
      'Multifidus provides segmental rotation',
      'Most rotation occurs in thoracic spine',
      'Lumbar rotation is limited'
    ],
    clinicalRelevance: 'Asymmetry may indicate muscle tightness or dysfunction.',
    commonErrors: ['Pelvis rotation', 'Shoulder movement only'],
    antagonistMotion: 'spineRotationRight'
  },

  // ============================================================================
  // SCAPULA MOTIONS
  // ============================================================================
  scapulaElevation: {
    id: 'scapulaElevation',
    name: 'Scapula Elevation',
    displayName: 'Scapular Elevation',
    joint: JOINTS.scapulaElevDep,
    targetDeg: 10,
    duration: 1.5,
    description: 'Shrugging shoulders upward',
    region: 'upper',
    keywords: ['scapula', 'elevation', 'shrug', 'raise', 'trapezius'],
    learningTips: [
      'Upper trapezius is the prime mover',
      'Levator scapulae assists',
      'Rhomboids assist',
      'Common compensation pattern in neck pain'
    ],
    clinicalRelevance: 'Upper trap dominance contributes to neck pain. Weakness affects carrying.',
    commonErrors: ['Cervical lateral flexion', 'Arm lifting'],
    antagonistMotion: 'scapulaDepression'
  },
  scapulaDepression: {
    id: 'scapulaDepression',
    name: 'Scapula Depression',
    displayName: 'Scapular Depression',
    joint: JOINTS.scapulaElevDep,
    targetDeg: -10,
    duration: 1.5,
    description: 'Lowering shoulders downward',
    region: 'upper',
    keywords: ['scapula', 'depression', 'lower', 'pec minor'],
    learningTips: [
      'Lower trapezius is the prime mover',
      'Serratus anterior (lower fibers) assists',
      'Pectoralis minor assists',
      'Important for posture and lat pulldowns'
    ],
    clinicalRelevance: 'Weakness contributes to poor scapular positioning. Important for overhead athletes.',
    commonErrors: ['Trunk flexion', 'Cervical flexion'],
    antagonistMotion: 'scapulaElevation'
  },
  scapulaProtraction: {
    id: 'scapulaProtraction',
    name: 'Scapula Protraction',
    displayName: 'Scapular Protraction',
    joint: JOINTS.scapulaProRet,
    targetDeg: 15,
    duration: 1.5,
    description: 'Moving scapula forward/away from spine',
    region: 'upper',
    keywords: ['scapula', 'protraction', 'forward', 'abduction', 'serratus'],
    learningTips: [
      'Serratus anterior is the prime mover',
      'Pectoralis minor assists',
      'Important for pushing and punching',
      'Scapular winging indicates SA weakness'
    ],
    clinicalRelevance: 'Serratus anterior weakness causes winging. Long thoracic nerve palsy.',
    commonErrors: ['Shoulder flexion', 'Trunk rotation'],
    antagonistMotion: 'scapulaRetraction'
  },
  scapulaRetraction: {
    id: 'scapulaRetraction',
    name: 'Scapula Retraction',
    displayName: 'Scapular Retraction',
    joint: JOINTS.scapulaProRet,
    targetDeg: -15,
    duration: 1.5,
    description: 'Moving scapula toward spine',
    region: 'upper',
    keywords: ['scapula', 'retraction', 'backward', 'adduction', 'rhomboid'],
    learningTips: [
      'Middle trapezius is the prime mover',
      'Rhomboids major and minor assist',
      'Important for posture and rowing',
      'Often weak in forward head posture'
    ],
    clinicalRelevance: 'Weakness contributes to rounded shoulders. Important for postural correction.',
    commonErrors: ['Shoulder extension', 'Cervical extension'],
    antagonistMotion: 'scapulaProtraction'
  },
  scapulaUpwardRotation: {
    id: 'scapulaUpwardRotation',
    name: 'Scapula Upward Rotation',
    displayName: 'Scapular Upward Rotation',
    joint: JOINTS.scapulaRotation,
    targetDeg: 60,
    duration: 2.0,
    description: 'Rotating scapula glenoid upward during arm elevation',
    region: 'upper',
    keywords: ['scapula', 'upward', 'rotation', 'scapulohumeral'],
    learningTips: [
      'Upper and lower trapezius work together',
      'Serratus anterior is essential',
      'Part of scapulohumeral rhythm (2:1)',
      'Required for full overhead reach'
    ],
    clinicalRelevance: 'Scapular dyskinesis affects overhead motion. Important for impingement prevention.',
    commonErrors: ['Shoulder hiking', 'Trunk lateral flexion'],
    antagonistMotion: 'scapulaDownwardRotation'
  },
  scapulaDownwardRotation: {
    id: 'scapulaDownwardRotation',
    name: 'Scapula Downward Rotation',
    displayName: 'Scapular Downward Rotation',
    joint: JOINTS.scapulaRotation,
    targetDeg: -30,
    duration: 2.0,
    description: 'Rotating scapula glenoid downward',
    region: 'upper',
    keywords: ['scapula', 'downward', 'rotation'],
    learningTips: [
      'Levator scapulae is primary',
      'Rhomboids assist',
      'Pectoralis minor assists',
      'Returns scapula to neutral after elevation'
    ],
    clinicalRelevance: 'Downward rotation bias contributes to impingement.',
    commonErrors: ['Trunk extension', 'Depression only'],
    antagonistMotion: 'scapulaUpwardRotation'
  },

  // ============================================================================
  // FINGER MOTIONS
  // ============================================================================
  fingerFlexion: {
    id: 'fingerFlexion',
    name: 'Finger Flexion',
    displayName: 'Finger Flexion',
    joint: JOINTS.fingerFlexExt,
    targetDeg: 90,
    duration: 1.5,
    description: 'Bending fingers to make a fist',
    region: 'hand',
    keywords: ['finger', 'flex', 'grip', 'fist'],
    learningTips: [
      'FDP flexes DIP joints',
      'FDS flexes PIP joints',
      'Lumbricals flex MCPs while extending IPs',
      'Interossei assist with MCP flexion'
    ],
    clinicalRelevance: 'Trigger finger affects flexor tendons. Carpal tunnel affects flexor function.',
    commonErrors: ['Wrist flexion', 'Thumb opposition'],
    antagonistMotion: 'fingerExtension'
  },
  fingerExtension: {
    id: 'fingerExtension',
    name: 'Finger Extension',
    displayName: 'Finger Extension',
    joint: JOINTS.fingerFlexExt,
    targetDeg: 0,
    duration: 1.5,
    description: 'Straightening fingers',
    region: 'hand',
    keywords: ['finger', 'extend', 'open', 'extensor'],
    learningTips: [
      'EDC extends all fingers at MCP',
      'Lumbricals extend IP joints',
      'Interossei also extend IPs',
      'Central slip extends PIP, lateral bands extend DIP'
    ],
    clinicalRelevance: 'Boutonniere deformity from central slip injury. Swan neck from lateral band problems.',
    commonErrors: ['Wrist extension', 'Hyperextension'],
    antagonistMotion: 'fingerFlexion'
  },
  thumbOpposition: {
    id: 'thumbOpposition',
    name: 'Thumb Opposition',
    displayName: 'Thumb Opposition',
    joint: JOINTS.thumbOpposition,
    targetDeg: 60,
    duration: 1.5,
    description: 'Touching thumb to fingertips',
    region: 'hand',
    keywords: ['thumb', 'opposition', 'pinch', 'grasp'],
    learningTips: [
      'Opponens pollicis is the prime mover',
      'Combines flexion, abduction, and rotation',
      'FPB and APB assist',
      'Unique to humans and primates'
    ],
    clinicalRelevance: 'Median nerve injury at wrist affects opposition. Essential for fine motor function.',
    commonErrors: ['Thumb flexion only', 'No rotation'],
    antagonistMotion: undefined
  },

  // ============================================================================
  // TOE MOTIONS
  // ============================================================================
  toeFlexion: {
    id: 'toeFlexion',
    name: 'Toe Flexion',
    displayName: 'Toe Flexion',
    joint: JOINTS.toeFlexExt,
    targetDeg: 30,
    duration: 1.5,
    description: 'Curling toes downward',
    region: 'foot',
    keywords: ['toe', 'flex', 'curl', 'grip'],
    learningTips: [
      'FDL flexes lesser toes',
      'FHL flexes great toe',
      'FDB flexes PIPs',
      'Lumbricals flex MTPs'
    ],
    clinicalRelevance: 'Claw toes from intrinsic weakness. Toe grip important for balance.',
    commonErrors: ['Ankle plantarflexion', 'Only great toe'],
    antagonistMotion: 'toeExtension'
  },
  toeExtension: {
    id: 'toeExtension',
    name: 'Toe Extension',
    displayName: 'Toe Extension',
    joint: JOINTS.toeFlexExt,
    targetDeg: -30,
    duration: 1.5,
    description: 'Lifting toes upward',
    region: 'foot',
    keywords: ['toe', 'extend', 'lift', 'dorsiflexion'],
    learningTips: [
      'EDL extends lesser toes',
      'EHL extends great toe',
      'EDB assists',
      'Important for toe clearance in gait'
    ],
    clinicalRelevance: 'Hammer toes from extensor imbalance. Important for swing phase.',
    commonErrors: ['Ankle dorsiflexion only', 'Only great toe'],
    antagonistMotion: 'toeFlexion'
  }
};

// ============================================================================
// MUSCLE-TO-MOTION MAPPING
// ============================================================================

export interface MuscleAnimationMap {
  muscleId: string;
  primaryMotions: string[]; // Motion IDs
  secondaryMotions: string[]; // Supporting motions
  gifSearchTerms: string[]; // Additional terms for GIF search
  // NEW: 3D model tags for highlighting
  modelTags?: string[]; // Tag names from 3D model for this muscle (optional)
}

/**
 * Maps muscles to their primary and secondary motions.
 * This is used to automatically select relevant animations and generate
 * accurate search queries.
 */
export const MUSCLE_ANIMATION_MAPS: Record<string, MuscleAnimationMap> = {
  // SHOULDER/ARM
  'deltoid': {
    muscleId: 'deltoid',
    primaryMotions: ['shoulderAbduction', 'shoulderFlexion', 'shoulderExtension'],
    secondaryMotions: ['shoulderMedialRotation', 'shoulderLateralRotation'],
    gifSearchTerms: ['shoulder raise', 'lateral raise', 'deltoid contraction'],
    modelTags: ['Deltoid muscle.r', 'Acromial part of deltoid muscle.r', 'Clavicular part of deltoid muscle.r', 'Spinal part of deltoid muscle.r']
  },
  'pectoralis-major': {
    muscleId: 'pectoralis-major',
    primaryMotions: ['shoulderFlexion', 'shoulderAdduction', 'shoulderMedialRotation'],
    secondaryMotions: ['shoulderHorizAdduction'],
    gifSearchTerms: ['bench press', 'chest fly', 'pec contraction'],
    modelTags: ['Pectoralis major muscle.r', 'Clavicular part of pectoralis major muscle.r', 'Sternocostal part of pectoralis major muscle.r', 'Abdominal part of pectoralis major muscle.r']
  },
  'latissimus-dorsi': {
    muscleId: 'latissimus-dorsi',
    primaryMotions: ['shoulderExtension', 'shoulderAdduction', 'shoulderMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['pull-up', 'lat pulldown', 'rowing'],
    modelTags: ['Latissimus dorsi muscle.r']
  },
  'trapezius': {
    muscleId: 'trapezius',
    primaryMotions: ['scapulaElevation', 'scapulaRetraction', 'scapulaDepression'],
    secondaryMotions: ['scapulaUpwardRotation'],
    gifSearchTerms: ['shrug', 'scapular retraction', 'shoulder blade'],
    modelTags: ['Trapezius muscle.r', 'Descending part of trapezius muscle.r', 'Transverse part of trapezius muscle.r', 'Ascending part of trapezius muscle.r']
  },
  'rhomboid-major': {
    muscleId: 'rhomboid-major',
    primaryMotions: ['scapulaRetraction', 'scapulaDownwardRotation'],
    secondaryMotions: ['scapulaElevation'],
    gifSearchTerms: ['scapular retraction', 'row', 'rhomboid squeeze']
  },
  'rhomboid-minor': {
    muscleId: 'rhomboid-minor',
    primaryMotions: ['scapulaRetraction', 'scapulaElevation'],
    secondaryMotions: [],
    gifSearchTerms: ['scapular retraction', 'rhomboid']
  },
  'serratus-anterior': {
    muscleId: 'serratus-anterior',
    primaryMotions: ['scapulaProtraction', 'scapulaUpwardRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['protraction', 'serratus', 'punching motion']
  },
  'levator-scapulae': {
    muscleId: 'levator-scapulae',
    primaryMotions: ['scapulaElevation'],
    secondaryMotions: ['scapulaDownwardRotation'],
    gifSearchTerms: ['shoulder shrug', 'neck']
  },
  'supraspinatus': {
    muscleId: 'supraspinatus',
    primaryMotions: ['shoulderAbduction'],
    secondaryMotions: [],
    gifSearchTerms: ['rotator cuff', 'abduction', 'supraspinatus']
  },
  'infraspinatus': {
    muscleId: 'infraspinatus',
    primaryMotions: ['shoulderLateralRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['rotator cuff', 'external rotation']
  },
  'teres-minor': {
    muscleId: 'teres-minor',
    primaryMotions: ['shoulderLateralRotation'],
    secondaryMotions: ['shoulderAdduction'],
    gifSearchTerms: ['rotator cuff', 'external rotation']
  },
  'subscapularis': {
    muscleId: 'subscapularis',
    primaryMotions: ['shoulderMedialRotation'],
    secondaryMotions: ['shoulderAdduction'],
    gifSearchTerms: ['rotator cuff', 'internal rotation']
  },
  'teres-major': {
    muscleId: 'teres-major',
    primaryMotions: ['shoulderExtension', 'shoulderAdduction', 'shoulderMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['shoulder extension', 'adduction']
  },
  'biceps-brachii': {
    muscleId: 'biceps-brachii',
    primaryMotions: ['elbowFlexion', 'forearmSupination'],
    secondaryMotions: ['shoulderFlexion'],
    gifSearchTerms: ['bicep curl', 'elbow flexion']
  },
  'brachialis': {
    muscleId: 'brachialis',
    primaryMotions: ['elbowFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['elbow flexion', 'hammer curl']
  },
  'brachioradialis': {
    muscleId: 'brachioradialis',
    primaryMotions: ['elbowFlexion'],
    secondaryMotions: ['forearmPronation', 'forearmSupination'],
    gifSearchTerms: ['elbow flexion', 'forearm']
  },
  'triceps-brachii': {
    muscleId: 'triceps-brachii',
    primaryMotions: ['elbowExtension'],
    secondaryMotions: ['shoulderExtension'],
    gifSearchTerms: ['tricep extension', 'elbow extension']
  },
  'coracobrachialis': {
    muscleId: 'coracobrachialis',
    primaryMotions: ['shoulderFlexion', 'shoulderAdduction'],
    secondaryMotions: [],
    gifSearchTerms: ['shoulder flexion']
  },
  'anconeus': {
    muscleId: 'anconeus',
    primaryMotions: ['elbowExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['elbow extension']
  },

  // FOREARM/WRIST
  'pronator-teres': {
    muscleId: 'pronator-teres',
    primaryMotions: ['forearmPronation'],
    secondaryMotions: ['elbowFlexion'],
    gifSearchTerms: ['forearm pronation']
  },
  'pronator-quadratus': {
    muscleId: 'pronator-quadratus',
    primaryMotions: ['forearmPronation'],
    secondaryMotions: [],
    gifSearchTerms: ['forearm pronation']
  },
  'supinator': {
    muscleId: 'supinator',
    primaryMotions: ['forearmSupination'],
    secondaryMotions: [],
    gifSearchTerms: ['forearm supination']
  },
  'flexor-carpi-radialis': {
    muscleId: 'flexor-carpi-radialis',
    primaryMotions: ['wristFlexion'],
    secondaryMotions: ['wristRadialDeviation'],
    gifSearchTerms: ['wrist flexion', 'radial deviation']
  },
  'flexor-carpi-ulnaris': {
    muscleId: 'flexor-carpi-ulnaris',
    primaryMotions: ['wristFlexion'],
    secondaryMotions: ['wristUlnarDeviation'],
    gifSearchTerms: ['wrist flexion', 'ulnar deviation']
  },
  'extensor-carpi-radialis': {
    muscleId: 'extensor-carpi-radialis',
    primaryMotions: ['wristExtension'],
    secondaryMotions: ['wristRadialDeviation'],
    gifSearchTerms: ['wrist extension', 'radial deviation']
  },
  'extensor-carpi-ulnaris': {
    muscleId: 'extensor-carpi-ulnaris',
    primaryMotions: ['wristExtension'],
    secondaryMotions: ['wristUlnarDeviation'],
    gifSearchTerms: ['wrist extension', 'ulnar deviation']
  },
  'palmaris-longus': {
    muscleId: 'palmaris-longus',
    primaryMotions: ['wristFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist flexion']
  },

  // HIP/THIGH
  'iliacus': {
    muscleId: 'iliacus',
    primaryMotions: ['hipFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'leg raise']
  },
  'psoas-major': {
    muscleId: 'psoas-major',
    primaryMotions: ['hipFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'leg raise']
  },
  'iliopsoas': {
    muscleId: 'iliopsoas',
    primaryMotions: ['hipFlexion'],
    secondaryMotions: ['hipLateralRotation'],
    gifSearchTerms: ['hip flexion', 'leg raise']
  },
  'gluteus-maximus': {
    muscleId: 'gluteus-maximus',
    primaryMotions: ['hipExtension', 'hipLateralRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip extension', 'glute squeeze']
  },
  'gluteus-medius': {
    muscleId: 'gluteus-medius',
    primaryMotions: ['hipAbduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip abduction', 'lateral raise']
  },
  'gluteus-minimus': {
    muscleId: 'gluteus-minimus',
    primaryMotions: ['hipAbduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip abduction', 'medial rotation']
  },
  'tensor-fasciae-latae': {
    muscleId: 'tensor-fasciae-latae',
    primaryMotions: ['hipAbduction', 'hipMedialRotation'],
    secondaryMotions: ['hipFlexion'],
    gifSearchTerms: ['hip flexion', 'abduction', 'TFL']
  },
  'sartorius': {
    muscleId: 'sartorius',
    primaryMotions: ['hipFlexion', 'kneeFlexion', 'hipLateralRotation', 'hipAbduction'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'knee flexion', 'crossed leg']
  },
  'rectus-femoris': {
    muscleId: 'rectus-femoris',
    primaryMotions: ['hipFlexion', 'kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension', 'hip flexion']
  },
  'vastus-lateralis': {
    muscleId: 'vastus-lateralis',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension']
  },
  'vastus-medialis': {
    muscleId: 'vastus-medialis',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension', 'VMO']
  },
  'vastus-intermedius': {
    muscleId: 'vastus-intermedius',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension']
  },
  'biceps-femoris': {
    muscleId: 'biceps-femoris',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipLateralRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'semitendinosus': {
    muscleId: 'semitendinosus',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipMedialRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'semimembranosus': {
    muscleId: 'semimembranosus',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipMedialRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'adductor-longus': {
    muscleId: 'adductor-longus',
    primaryMotions: ['hipAdduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'adductor-brevis': {
    muscleId: 'adductor-brevis',
    primaryMotions: ['hipAdduction'],
    secondaryMotions: ['hipFlexion'],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'adductor-magnus': {
    muscleId: 'adductor-magnus',
    primaryMotions: ['hipAdduction'],
    secondaryMotions: ['hipExtension'],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'gracilis': {
    muscleId: 'gracilis',
    primaryMotions: ['hipAdduction', 'hipMedialRotation', 'kneeFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['hip adduction', 'knee flexion']
  },
  'pectineus': {
    muscleId: 'pectineus',
    primaryMotions: ['hipFlexion', 'hipAdduction'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'adduction']
  },

  // LEG/ANKLE
  'gastrocnemius': {
    muscleId: 'gastrocnemius',
    primaryMotions: ['anklePlantarflexion', 'kneeFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['calf raise', 'plantarflexion']
  },
  'soleus': {
    muscleId: 'soleus',
    primaryMotions: ['anklePlantarflexion'],
    secondaryMotions: [],
    gifSearchTerms: ['calf raise', 'plantarflexion', 'soleus']
  },
  'tibialis-anterior': {
    muscleId: 'tibialis-anterior',
    primaryMotions: ['ankleDorsiflexion', 'ankleInversion'],
    secondaryMotions: [],
    gifSearchTerms: ['dorsiflexion', 'ankle flex']
  },
  'tibialis-posterior': {
    muscleId: 'tibialis-posterior',
    primaryMotions: ['anklePlantarflexion', 'ankleInversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'inversion']
  },
  'fibularis-longus': {
    muscleId: 'fibularis-longus',
    primaryMotions: ['anklePlantarflexion', 'ankleEversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'eversion', 'peroneus']
  },
  'fibularis-brevis': {
    muscleId: 'fibularis-brevis',
    primaryMotions: ['anklePlantarflexion', 'ankleEversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'eversion', 'peroneus']
  },

  // TRUNK/SPINE
  'rectus-abdominis': {
    muscleId: 'rectus-abdominis',
    primaryMotions: ['spineFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['crunch', 'sit-up', 'trunk flexion']
  },
  'external-oblique': {
    muscleId: 'external-oblique',
    primaryMotions: ['spineFlexion', 'spineRotationLeft', 'spineLateralFlexionLeft'],
    secondaryMotions: [],
    gifSearchTerms: ['trunk rotation', 'oblique twist']
  },
  'internal-oblique': {
    muscleId: 'internal-oblique',
    primaryMotions: ['spineFlexion', 'spineRotationRight', 'spineLateralFlexionRight'],
    secondaryMotions: [],
    gifSearchTerms: ['trunk rotation', 'oblique']
  },
  'transverse-abdominis': {
    muscleId: 'transverse-abdominis',
    primaryMotions: [],
    secondaryMotions: [],
    gifSearchTerms: ['core compression', 'abdominal brace']
  },
  'erector-spinae': {
    muscleId: 'erector-spinae',
    primaryMotions: ['spineExtension'],
    secondaryMotions: ['spineLateralFlexionRight', 'spineLateralFlexionLeft'],
    gifSearchTerms: ['back extension', 'spine extension']
  },
  'quadratus-lumborum': {
    muscleId: 'quadratus-lumborum',
    primaryMotions: ['spineLateralFlexionRight', 'spineLateralFlexionLeft'],
    secondaryMotions: ['spineExtension'],
    gifSearchTerms: ['lateral flexion', 'side bend']
  },
  // FOREARM/HAND - Additional muscles
  'extensor-digitorum': {
    muscleId: 'extensor-digitorum',
    primaryMotions: [],
    secondaryMotions: [],
    gifSearchTerms: ['finger extension', 'hand extension']
  },
  'flexor-digitorum-superficialis': {
    muscleId: 'flexor-digitorum-superficialis',
    primaryMotions: [],
    secondaryMotions: [],
    gifSearchTerms: ['finger flexion', 'grip']
  },
  // HIP - Additional muscles
  'piriformis': {
    muscleId: 'piriformis',
    primaryMotions: ['hipAbduction', 'hipLateralRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip external rotation', 'piriformis stretch']
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all motions for a specific muscle by ID
 * Also includes antagonist motions to enable proper antagonist flip functionality
 */
export function getMotionsForMuscle(muscleId: string): MotionDefinition[] {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return [];
  
  const allMotionIds = [...map.primaryMotions, ...map.secondaryMotions];
  const motions = allMotionIds
    .map(id => MOTIONS[id])
    .filter(Boolean);
  
  // Add antagonist motions for each motion to enable proper flip functionality
  const antagonistMotions: MotionDefinition[] = [];
  motions.forEach(motion => {
    if (motion.antagonistMotion) {
      const antagonist = MOTIONS[motion.antagonistMotion];
      if (antagonist && !motions.some(m => m.id === antagonist.id) && !antagonistMotions.some(m => m.id === antagonist.id)) {
        antagonistMotions.push(antagonist);
      }
    }
  });
  
  return [...motions, ...antagonistMotions];
}

/**
 * Get primary motions only
 */
export function getPrimaryMotionsForMuscle(muscleId: string): MotionDefinition[] {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return [];
  
  return map.primaryMotions
    .map(id => MOTIONS[id])
    .filter(Boolean);
}

/**
 * Generate GIF search query for a muscle
 */
export function generateGifSearchQuery(muscleId: string, muscleName: string, motionId?: string): string {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return `${muscleName} muscle animation`;
  
  if (motionId) {
    const motion = MOTIONS[motionId];
    if (motion) {
      return `${muscleName} muscle ${motion.name} animation`;
    }
  }
  
  // Use first primary motion and additional search terms
  const primaryMotion = MOTIONS[map.primaryMotions[0]];
  const searchTerm = map.gifSearchTerms[0] || primaryMotion?.name || 'contraction';
  return `${muscleName} muscle ${searchTerm} animation`;
}

/**
 * Get all motions grouped by region
 */
export function getMotionsByRegion(region?: 'upper' | 'lower' | 'axial' | 'hand' | 'foot'): MotionDefinition[] {
  const allMotions = Object.values(MOTIONS);
  if (!region) return allMotions;
  return allMotions.filter(m => m.region === region);
}

/**
 * Search motions by keyword
 */
export function searchMotions(query: string): MotionDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(MOTIONS).filter(motion => 
    motion.name.toLowerCase().includes(lowerQuery) ||
    motion.description.toLowerCase().includes(lowerQuery) ||
    motion.keywords.some(kw => kw.includes(lowerQuery))
  );
}

/**
 * Get the best matching motion for a text action description
 */
export function matchActionToMotion(actionText: string): MotionDefinition | null {
  const lowerAction = actionText.toLowerCase();
  
  // Direct matches on motion names
  for (const motion of Object.values(MOTIONS)) {
    if (lowerAction.includes(motion.name.toLowerCase())) {
      return motion;
    }
  }
  
  // Keyword matches
  for (const motion of Object.values(MOTIONS)) {
    for (const keyword of motion.keywords) {
      if (lowerAction.includes(keyword)) {
        return motion;
      }
    }
  }
  
  return null;
}

/**
 * Get model type (upper/lower/overview) for a motion
 */
export function getModelTypeForMotion(motion: MotionDefinition): 'upper' | 'lower' | 'overview' {
  if (motion.region === 'upper' || motion.region === 'hand') return 'upper';
  if (motion.region === 'lower' || motion.region === 'foot') return 'lower';
  return 'overview';
}

// ============================================================================
// NEW HELPER FUNCTIONS - Visibility and Layer Management
// ============================================================================

/**
 * Get visibility profile for a motion
 */
export function getVisibilityProfile(motionId: string): VisibilityProfile | null {
  return VISIBILITY_PROFILES[motionId] || null;
}

/**
 * Get nodes to hide for a specific motion
 */
export function getHiddenNodesForMotion(motionId: string): string[] {
  const profile = VISIBILITY_PROFILES[motionId];
  return profile?.hideNodes || [];
}

/**
 * Get nodes to highlight for a specific motion
 */
export function getHighlightedNodesForMotion(motionId: string): string[] {
  const profile = VISIBILITY_PROFILES[motionId];
  return profile?.highlightNodes || [];
}

/**
 * Get the camera focus node for a motion
 */
export function getCameraFocusForMotion(motionId: string): string | null {
  const profile = VISIBILITY_PROFILES[motionId];
  return profile?.cameraFocus || null;
}

/**
 * Get layer preset by ID
 */
export function getLayerPreset(presetId: string): LayerPreset | null {
  return LAYER_PRESETS[presetId] || null;
}

/**
 * Get all available layer presets
 */
export function getAllLayerPresets(): LayerPreset[] {
  return Object.values(LAYER_PRESETS);
}

/**
 * Get all model tags for a category and model type
 */
export function getModelTagsForCategory(
  modelType: 'hand' | 'lowerLimb' | 'upperLimb',
  category: keyof typeof MODEL_TAGS.hand
): string[] {
  const modelTags = MODEL_TAGS[modelType];
  if (!modelTags) return [];
  
  const categoryTags = (modelTags as any)[category];
  return Array.isArray(categoryTags) ? categoryTags : [];
}

/**
 * Get nodes to show for a layer preset
 */
export function getNodesForLayerPreset(
  presetId: string, 
  modelType: 'hand' | 'lowerLimb' | 'upperLimb'
): string[] {
  const preset = LAYER_PRESETS[presetId];
  if (!preset) return [];
  
  const nodes: string[] = [];
  for (const category of preset.showCategories) {
    const categoryNodes = getModelTagsForCategory(modelType, category as any);
    nodes.push(...categoryNodes);
  }
  return nodes;
}

/**
 * Get learning tips for a motion
 */
export function getLearningTipsForMotion(motionId: string): string[] {
  const motion = MOTIONS[motionId];
  return motion?.learningTips || [];
}

/**
 * Get clinical relevance for a motion
 */
export function getClinicalRelevanceForMotion(motionId: string): string {
  const motion = MOTIONS[motionId];
  return motion?.clinicalRelevance || '';
}

/**
 * Get common errors for a motion
 */
export function getCommonErrorsForMotion(motionId: string): string[] {
  const motion = MOTIONS[motionId];
  return motion?.commonErrors || [];
}

/**
 * Get antagonist motion
 */
export function getAntagonistMotion(motionId: string): MotionDefinition | null {
  const motion = MOTIONS[motionId];
  if (!motion?.antagonistMotion) return null;
  return MOTIONS[motion.antagonistMotion] || null;
}

/**
 * Get model tags for a muscle from MUSCLE_ANIMATION_MAPS
 */
export function getModelTagsForMuscle(muscleId: string): string[] {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  return map?.modelTags || [];
}

/**
 * Get joint specification with all bone/muscle info for a motion
 */
export function getJointInfoForMotion(motionId: string): JointSpec | null {
  const motion = MOTIONS[motionId];
  return motion?.joint || null;
}

/**
 * Check if a node name matches any pattern in a list (case-insensitive partial match)
 */
export function nodeMatchesPatterns(nodeName: string, patterns: string[]): boolean {
  const lowerName = nodeName.toLowerCase();
  return patterns.some(pattern => lowerName.includes(pattern.toLowerCase()));
}

/**
 * Get all motions with educational content
 */
export function getEducationalMotions(): MotionDefinition[] {
  return Object.values(MOTIONS).filter(m => 
    m.learningTips && m.learningTips.length > 0
  );
}

/**
 * Get motions by joint type
 */
export function getMotionsByJoint(jointId: string): MotionDefinition[] {
  return Object.values(MOTIONS).filter(m => m.joint.id === jointId);
}

/**
 * Get all unique regions
 */
export function getAllRegions(): string[] {
  const regions = new Set<string>();
  Object.values(MOTIONS).forEach(m => regions.add(m.region));
  return Array.from(regions);
}
