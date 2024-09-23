'use client'

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

interface Image {
  id: string;
  name: string;
  src: string;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  name: string;
  selectedImage: Image;
  motive: string;
  badgeColor: string;
  backgroundColor: string;
}

function Band({ maxSpeed = 50, minSpeed = 10, name, selectedImage, motive, badgeColor, backgroundColor }: BandProps) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<any>(null)
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
  const { nodes } = useGLTF('/tag.glb')
  const bandTexture = useTexture('/band.jpg')
  const imageTexture = useTexture(selectedImage.src)
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        if (ref.current && !ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current?.lerped.distanceTo(ref.current?.translation()) || 0))
        ref.current?.lerped.lerp(ref.current?.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current?.translation() || new THREE.Vector3())
      curve.points[1].copy(j2.current?.lerped || new THREE.Vector3())
      curve.points[2].copy(j1.current?.lerped || new THREE.Vector3())
      curve.points[3].copy(fixed.current?.translation() || new THREE.Vector3())
      band.current.geometry.setPoints(curve.getPoints(32))
      if (card.current) {
        ang.copy(card.current.angvel())
        rot.copy(card.current.rotation())
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
      }
    }
  })

  curve.curveType = 'chordal'
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[-1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current?.translation() || new THREE.Vector3()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color={badgeColor} metalness={0.5} roughness={0.2} clearcoat={1} clearcoatRoughness={0.2} />
            </mesh>
            <mesh geometry={nodes.clip.geometry}>
              <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.66, 0.011]} scale={[0.5, 0.5, 1]}>
              <planeGeometry args={[1.4, 1.4]} />
              <meshBasicMaterial map={imageTexture} transparent opacity={0.9} />
            </mesh>
            <Text
              position={[0, 0.1, 0.011]}
              fontSize={0.12}
              color="red"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.5}
            >
              {name}
            </Text>
            <Text
              position={[0, -0.1, 0.011]}
              fontSize={0.08}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.5}
            >
              {motive}
            </Text>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={true} resolution={[width, height]} useMap map={bandTexture} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  )
}

interface BadgeProps {
  onClose: () => void;
  selectedImage: Image;
}

export default function Badge({ onClose, selectedImage }: BadgeProps) {
  const [name, setName] = useState('Iver R Finne')
  const [motive, setMotive] = useState('Arbeid')
  const [badgeColor, setBadgeColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 0.5)')

  return (
    <div style={{ 
      width: '100%', 
      height: '90vh', 
      position: 'relative', 
      backgroundColor: backgroundColor
    }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <color attach="background" args={['rgba(255, 255, 255, 0)']} />
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band name={name} selectedImage={selectedImage} motive={motive} badgeColor={badgeColor} backgroundColor={backgroundColor} />
        </Physics>
        <Environment background={false}>
          <Lightformer intensity={2} color="white" position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} color="white" position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={4} color="white" position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={4} color="black" position={[5, 1, -1]} scale={[10, 2, 1]} />
        </Environment>
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'black' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Skriv inn navn"
          style={{ 
            marginRight: '10px', 
            padding: '5px', 
            background: 'rgba(0, 0, 0, 0.1)', 
            color: 'black', 
            border: 'none' 
          }}
        />
       
        <input
          type="color"
          value={badgeColor}
          onChange={(e) => setBadgeColor(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '0',
            background: 'none',
            border: 'none',
            width: '30px',
            height: '30px',
            cursor: 'pointer'
          }}
        />
      </div>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.1)',
          color: 'black',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Lukk
      </button>
    </div>
  )
}